const apiHost = 'http://localhost:9000';

export function getToken(){
    return fetch(apiHost + "/dev/token", {
        method: 'GET',
        headers: { 
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*' 
        }
    });
}

export function syncronizeCustomer(){
    return fetch(apiHost + "/dev/sync/customer", {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*' 
        }
    });
}

export function syncronizeSupplier(){
    return fetch(apiHost + "/dev/sync/supplier", {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*' 
        }
    });
}


export function login(){
    // change the link to the proper endpoint
    return fetch(apiHost + "", {
        method: 'POST',
        headers: { 
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*' 
        }
    });
}