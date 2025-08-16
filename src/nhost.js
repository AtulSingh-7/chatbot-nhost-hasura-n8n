// src/nhost.js
import { NhostClient } from '@nhost/nhost-js'

const nhost = new NhostClient({
  subdomain: 'wfjlnfvstthrpedudpew', // from your NHOST_SUBDOMAIN
  region: 'eu-central-1' // from your NHOST_REGION
})

export default nhost
