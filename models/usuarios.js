const usuariosQueries = {
    insertUsuario: `
        INSERT INTO 
            usuarios(
            nombre,
            email,
            contrasena,
            status
        )
        VALUES
            (?,?,?,?);
    `,
selectUsuarios:`
    SELECT
    *
    FROM
    usuarios
    WHERE 
    status = 1
`,
updateUsuario:`
UPDATE
usuarios
SET 
    nombre=?,
    status=?
    WHERE 
    email=?

`,
deleteUsuario:`
UPDATE
usuarios
SET
status=0
WHERE
email=?
`
} 
module.exports = usuariosQueries;