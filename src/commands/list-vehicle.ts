import { Command, Flags } from '@oclif/core';

export default class ListVehicles extends Command { 
    
    static description = 'List all vehicles';
    
    static flags = {
        address: Flags.string({ 
            description: 'Server address', 
            required: true, 
        }),
    }
    
    async run(): Promise<void> {
        const { flags } = await this.parse(ListVehicles);
        const response = await fetch(`http://${flags.address}/vehicles`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        
        if (!response.ok) {
            this.log('Could not fetch vehicle - server results')
            this.exit(1)
        }
        
        const data = await response.json()
        this.log(JSON.stringify(data.vehicles, null, 2))
    }
}