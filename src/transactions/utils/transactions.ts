import { JwtService } from "@nestjs/jwt";

export function returnJWT(token: string ): string | null {
    const jwtService = new JwtService();
    const dataJWT = jwtService.decode(token);

    if (!dataJWT) {
        return null;
    }

    return dataJWT.id;
} 