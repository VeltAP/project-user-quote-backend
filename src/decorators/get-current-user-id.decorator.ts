import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from 'src/modules/user/user.entity'

export const GetCurrentUserId = createParamDecorator((_: undefined, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest()
  const user = request.user as User
  return user.id
})