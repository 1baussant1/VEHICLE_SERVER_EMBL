import { Command, Flags } from '@oclif/core'

export default class CreateVehicle extends Command {
  static description = 'Create vehicle'

  static flags = {
    address: Flags.string({
      description: "server adress",
      required: true,

    }),

    shortcode: Flags.string({
      description: 'vehicle shortcode (max 4 characters)',
      required: true,
    }),
    battery: Flags.integer({
      description: 'battery',
      required: true,
    }),
    // oclif ne supporte pas le type float, alors on l'exprime en string d'abord puis conversion en float dans la requête
    latitude: Flags.string({
      description: 'latitude',
      required: true,
    }),

    // Pareil
    longitude: Flags.string({
      description: 'longitude',
      required: true,
    }),
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(CreateVehicle)

    const req = await fetch(`http://${flags.address}/vehicles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        shortcode: flags.shortcode,
        battery: flags.battery,
        position: {
          latitude: parseFloat(flags.latitude),
          longitude: parseFloat(flags.longitude),
        },
      }),
    })


    if (!req.ok) {
      this.log('Could not create the vehicle, consult server info')
      this.exit(1)
    }

    const data = await req.json()
    this.log(`You created vehicule \`${data.vehicle.shortcode}\`, it's ID: \`${data.vehicle.id}\``)
  }
}

