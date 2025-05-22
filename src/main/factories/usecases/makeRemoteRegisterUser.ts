import { makeApiUrl, makeAxiosHttpClient } from "../http";
import type { RegisterUserUseCase } from "@/domain/usecases/RegisterUser.usecase";
import { RemoteRegisterUser } from "@/data/usecases/RemoteRegisterUser";

export const makeRemoteRegisterUser = (): RegisterUserUseCase => new RemoteRegisterUser(makeApiUrl("/user/register"), makeAxiosHttpClient());