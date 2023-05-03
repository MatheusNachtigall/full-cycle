queries = [
    ["CREATE_ACCOUNT", "1", "account1"],
    ["CREATE_ACCOUNT", "2", "account2"],
    ["DEPOSIT", "3", "account1", "2000"],
    ["PAY", "4", "account1", "1000"],
    ["PAY", "100", "account1", "1000"],
    ["GET_PAYMENT_STATUS", "101", "non-existing", "payment1"],
    ["GET_PAYMENT_STATUS", "102", "account2", "payment1"],
    ["GET_PAYMENT_STATUS", "103", "account1", "payment1"],
    ["TOP_SPENDERS", "104", "2"],
    ["DEPOSIT", "86400003", "account1", "100"],
    ["DEPOSIT", "86400005", "account1", "100"],
    ["DEPOSIT", "86400099", "account1", "100"],
    ["DEPOSIT", "86400100", "account1", "100"]
]

queries2 = [["CREATE_ACCOUNT","1","account1"], 
 ["CREATE_ACCOUNT","2","account2"], 
 ["DEPOSIT","3","account1","2000"], 
 ["DEPOSIT","4","account2","1000"], 
 ["PAY","5","account1","100"], 
 ["PAY","6","account2","200"], 
 ["PAY","7","account2","300"], 
 ["PAY","8","account1","400"], 
 ["DEPOSIT","9","account1","100"], 
 ["DEPOSIT","10","account2","100"], 
 ["DEPOSIT","86400010","account1","100"], 
 ["DEPOSIT","86400011","account2","100"]]

function solution(queries) {
    const accounts = {};
    const transactions = {};
    let payTransactions = [];
    let paidTransactions = [];
    let paymentCounter = 0;

    const results = [];
    
    for (const query of queries) {
        const [operation, timestamp, ...params] = query;
        
        if (payTransactions.length > 0 && +timestamp >= payTransactions[0][0]) {
            accounts[payTransactions[0][1]] += +payTransactions[0][2];
            paidTransactions.push(payTransactions.shift());
        }
        
        if (operation === "CREATE_ACCOUNT") {
            let [accountId] = params;
            if (!accounts[accountId] && accounts[accountId] != 0 ) {
                accounts[accountId] = 0;
                transactions[accountId] = 0;
                results.push("true")
            } else {
                results.push("false")
            }
        }
        if (operation === "DEPOSIT") {
            let [accountId,value] = params;
            if (!accounts[accountId] && accounts[accountId] != 0) {
                results.push("")
            } else {
                accounts[accountId] += +value;
                results.push(accounts[accountId].toString())
            }
        }
        
        if (operation === "PAY") {
            let [accountId,value] = params;
            if ((!accounts[accountId] && accounts[accountId] != 0) || accounts[accountId] < +value ) {
                results.push("")
            } else {
                const cashbackAmount = Math.floor(+value * 0.02);
                const cashbackTimestamp = +timestamp + 86400000;


                accounts[accountId] -= +value;
                paymentCounter += 1;
                let paymentId = "payment"+paymentCounter
                results.push(paymentId)
                
                payTransactions.push([cashbackTimestamp, accountId, cashbackAmount, paymentId])
                payTransactions = payTransactions.sort((a,b) => b.cashbackTimestamp - a.cashbackTimestamp)

            }
        }
        
        if (operation === "GET_PAYMENT_STATUS") {
            let [accountId,paymentId] = params;
            let foundTransaction = false;
            
            for (let i = 0; i < payTransactions.length; i++) {
                if (payTransactions[0].accountId === accountId && payTransactions[0].paymentId === paymentId) {
                    results.push("IN_PROGRESS")
                    foundTransaction = true;
                }
            }
            for (let i = 0; i < paidTransactions.length; i++) {
                if (paidTransactions[0].accountId === accountId && paidTransactions[0].paymentId === paymentId) {
                    results.push("CASHBACK_RECEIVED")
                    foundTransaction = true;
                }
            }
            if (!foundTransaction) {
                results.push("")
            }

        }
        
        if (operation === "TRANSFER") {
            let [from,to,value] = params;
            if ((!accounts[from] && accounts[from] != 0) || (!accounts[to] && accounts[to] != 0) || accounts[from] < +value || from === to ) {
                results.push("")
            } else {
                accounts[from] -= +value;
                accounts[to] += +value;
                transactions[from] += +value;
                results.push(accounts[from].toString())
            }
        }
        if (operation === "TOP_SPENDERS") {
            let [top] = params;
            
            let spenders = Object.keys(transactions)
                .map(accountId => { let total = transactions[accountId]; return { accountId, total }})
                .sort((a, b) => b.total - a.total || a.accountId.localeCompare(b.accountId))
                .map(({accountId, total}) => `${accountId}(${total})`);
            
            if (spenders.length > top) {
                spenders = spenders.slice(0, top);
            }
            results.push(spenders.join(', '));
        }
    }
    return results;
}


let sol = solution(queries2)

console.log(sol)