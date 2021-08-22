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
    LIMIT 
    ?,?
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
`,
deleteusu2:`
UPDATE
usuarios
SET 
contrasena=444
WHERE 
nombre=?
`,
getUsuarioByEmail:`
SELECT
*
FROM
usuarios
WHERE
email=?
AND
status=1
`,
} 
module.exports = usuariosQueries;