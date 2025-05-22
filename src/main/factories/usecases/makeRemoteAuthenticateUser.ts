import { RemoteAuthenticateUser } from "@/data/usecases/RemoteAuthenticateUser";
import type { AuthenticateUserUseCase } from "@/domain/usecases/AuthenticateUserUseCase";
import { makeApiUrl, makeAxiosHttpClient } from "../http";

export const makeRemoteAuthenticateUser = (): AuthenticateUserUseCase => new RemoteAuthenticateUser(makeApiUrl("/auth/login"), makeAxiosHttpClient());