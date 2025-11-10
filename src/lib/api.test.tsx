import axios from "axios";
import { Api } from "./api";

jest.mock('axios')
const axiosMock = axios as jest.Mocked<typeof axios>

describe(Api.name, () => {
  beforeAll(() => {
    axiosMock.create.mockReturnValue(axios)
  })

  it(`should have axios instace when contructor is called`, () => {
    new Api('teste')

    expect(axiosMock.create).toHaveBeenCalledWith({
      baseURL: 'teste'
    })
  })
})
