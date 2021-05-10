function rabinKarp(str, pat) {
    if (pat.length === 0) {
        return 0;
    }

    if (txt.length === 0) {
        return -1;
    }

    const patLength = pat.length;
    const strLength = txt.length;
    const MOD = 1000000;

    let power = 1;
    for (let i = 0; i < patLength; i++) {
        power = (power * 31) % MOD;
    }

    let patHash = 0;
    for (let i = 0; i < patLength; i++) {
        patHash = (patHash * 31 + pat.charCodeAt(i)) % MOD;
    }

    let subStrHash = 0;
    for (let i = 0; i < strLength; i++) {
        subStrHash = (subStrHash * 31 + str.charCodeAt(i)) % MOD;
        if (i < m - 1) {
            continue;
        }

        if (i >= m) {
            subStrHash = subStrHash - ((str.charCodeAt(i - m) * power) % MOD);
            if (subStrHash < 0) {
                subStrHash += MOD;
            }
        }

        if (subStrHash === patLength) {
            if (str.substring(i - m + 1, i + 1) === pat) {
                return i - m + 1;
            }
        }
    }
}

function kmp(haystack, needle) {
    const n = haystack.length,
        m = needle.length;

    if (m === 0) {
        return 0;
    }
    const pi = new Array(m).fill(0);

    for (let i = 1, j = 0; i < m; i++) {
        while(j > 0 && needle[i] !== needle[j]) {
            j = pi[j - 1];
        }
        if (needle[i] === needle[j]) {
            j++;
        }
        pi[i] = j;
    }

    console.log(pi);

    for (let i = 0, j = 0; i < n; i++) {
        while (j > 0 && haystack[i] != needle[j]) {
            j = pi[j - 1];
        }
        if (haystack[i] == needle[j]) {
            j++;
        }
        if (j === m) {
            return i - m + 1;
        }
    }
    return -1;
}
console.log(kmp("abacabaaaa", "abaa"));