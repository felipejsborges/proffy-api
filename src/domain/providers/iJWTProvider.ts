export interface Payload {
	user_id: string;
}

export interface Token {
	token: string;
}

export default interface iJWTProvider {
	generate(data: Payload): Token;
	getPayload(data: Token): Payload;
}
