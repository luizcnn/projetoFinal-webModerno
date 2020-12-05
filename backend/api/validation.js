module.exports = app => {
    function existsOrError(value, msg) {
        if(!value) throw msg
    
        if(Array.isArray(value) && value.length === 0) throw msg
    
        if(typeof value === 'string' && !value.trim()) throw msg
    }
    
    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        } catch (msg) {
            return
        }
    
        throw msg
    }
    
    function equalsOrError(valueA, valueB, msg) {
        if(valueA !== valueB) throw msg
    }
    //Podemos criar mais validações (verificar se o email possui a estrutura adequada de um email)
    // Verificar se a senha possui só letras, letras e numeros, tamanho mínimo da senha, etc;

    return { existsOrError, notExistsOrError, equalsOrError }
}