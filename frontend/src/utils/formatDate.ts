export function formatDate(dataString:string):string{
    return new Date(dataString).toLocaleString('es-ES',{
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })
}