export default function validateEnv(env) {
    if (!env.hasOwnProperty('PORT') || !env.PORT) throw new Error('invalid env param PORT');
    if (!env.hasOwnProperty('JWT_SECRET') || !env.PORT) throw new Error('invalid env param JWT_SECRET');
}
