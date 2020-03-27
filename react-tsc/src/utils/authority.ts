export function getAuthority(str?: string): string | String[] {
    const authorityString =
        typeof str === "undefined" ? localStorage.getItem("authority") : str;
    let authority;
    try {
        if (authorityString) {
            authority = JSON.parse(authorityString);
        }
    } catch (error) {
        authority = authorityString;
    }
    if (typeof authority === "string") {
        return [authority];
    }
    if (!authority) {
        return ["admin"];
    }
    return authority;
}

export function setAuthority(authority: string | string[]): void {
    const proAuthority =
        typeof authority === "string" ? [authority] : authority;
    return localStorage.setItem(
        "authority",
        JSON.stringify(proAuthority)
    );
}
