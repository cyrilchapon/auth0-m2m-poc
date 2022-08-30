import { api } from './api'

const go = async () => {
  const bears = await api.listBears()
  console.log(bears)
}

go()
