import { VehicleStore } from '../store/vehicle';
import { AppError, ErrorCode } from '../errors';
import { Request, Response } from 'express';

interface CreateVehiclePayload {
  // Position au lieu d'un param latitude et longitude séparé 
  shortcode: string;
  battery: number;
  position: {
    latitude: number;
    longitude: number;
  };
}

export class CreateVehicleController {
  constructor(private readonly vehicleStore: VehicleStore) {}

  public async handle(req: Request<object, object, CreateVehiclePayload>, res: Response): Promise<void> {
    const violations = validateRequestPayload(req.body);
    if (violations.length > 0) {
      throw new AppError(
        ErrorCode.BadRequest,
        "Invalid create vehicle request",
        { violations: violations },
      )
    }

    const vehicle = await this.vehicleStore.createVehicle({
      shortcode: req.body.shortcode,
      battery: req.body.battery,
      position: {
        latitude: req.body.position.latitude, // MAJ
        longitude: req.body.position.longitude, //MAJ
      },
    });

    res.status(200).json({ vehicle: vehicle });
  }
}

function validateRequestPayload(req: CreateVehiclePayload): string[] {
  const violations :string[] = []

  if (!req.shortcode || req.shortcode.length !== 4) {
    violations.push("Shortcode must be only 4 characters long");
  }

  if (req.battery < 0 || req.battery > 100) {
    violations.push("Battery level must be between 0 and 100");
  }

  // Verification de la position, structure du code légèrement modifiée pour passer les tests.
  if (!req.position) {
    violations.push("Position is required");
  } else {
    const { latitude, longitude } = req.position;

    if (latitude < -90 || latitude > 90) {
      violations.push("Latitude must be between -90 and 90");
    }
    if (longitude < -180 || longitude > 180) {
      violations.push("Longitude must be between -180 and 180");
    }
  }

  return violations;
}

