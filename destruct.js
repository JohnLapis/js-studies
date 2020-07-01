function topSalary(salaries = null) {
    if (!salaries) return null
    let maxSalary = 0
    for (let [name, salary] of Object.entries(salaries)) {
        if (salary > maxSalary){
            maxSalary = salary
            maxName = name
        }
    }
    return maxName
}

alert(Date.now() / (3_600_000))
