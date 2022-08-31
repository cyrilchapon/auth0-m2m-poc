import { insecureApi, secureApi } from './api'
import chalk from 'chalk'

const go = async () => {
  try {
    const bears = await insecureApi.listBears()
    console.log(chalk.green('Worked with insecure'))
    console.log(bears)
  } catch (err) {
    console.log(chalk.red('Failed with insecure'))
    console.error(`Error: ${err instanceof Error ? err.message : err}`)
  }

  console.log('-----------')

  try {
    const bears = await secureApi.listBears()
    console.log(chalk.green('Worked with secure'))
    console.log(bears)
  } catch (err) {
    console.log(chalk.red('Failed with secure'))
    console.error((err as Error).message)
  }
}

go()
