import { anonymousApiClient, authenticatedApiClient } from './api'
import chalk from 'chalk'

const go = async () => {
  try {
    const bears = await anonymousApiClient.listBears()
    console.log(chalk.green('Worked with anonymous'))
    console.log(bears)
  } catch (err) {
    console.log(chalk.red('Failed with anonymous'))
    console.error(`Error: ${err instanceof Error ? err.message : err}`)
  }

  console.log('-----------')

  try {
    const bears = await authenticatedApiClient.listBears()
    console.log(chalk.green('Worked with authenticated'))
    console.log(bears)
  } catch (err) {
    console.log(chalk.red('Failed with authenticated'))
    console.error((err as Error).message)
    console.error(err)
  }
}

go()
