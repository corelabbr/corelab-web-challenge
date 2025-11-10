import { todoSchemaValidation } from "./todoSchema";

describe('todoSchemaValidation', () => {

  it('should return error if title is not passed', () => {
    const result = todoSchemaValidation.safeParse({
      description: 'teste'
    })

    expect(result.error?.errors[0].code).toEqual('invalid_type')
  })

  it('should return error if description is not passed', () => {
    const result = todoSchemaValidation.safeParse({
      title: 'teste'
    })

    expect(result.error?.errors[0].code).toEqual('invalid_type')
  })

  it('should return error if description has length less that 2', () => {
    const result = todoSchemaValidation.safeParse({
      title: 'teste',
      description: '1'
    })

    expect(result.error?.errors[0].code).toEqual('too_small')
  })

  it('should return error if title has length less that 2', () => {
    const result = todoSchemaValidation.safeParse({
      title: '1',
      description: 'asd'
    })

    expect(result.error?.errors[0].code).toEqual('too_small')
  })

})
