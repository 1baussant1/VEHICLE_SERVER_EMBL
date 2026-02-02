#!/usr/bin/env node
import { run } from '@oclif/core'

run().catch((e) => {
  console.error(e)
  process.exit(1)
})