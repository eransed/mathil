import { mathil_info } from "./_version";

export function getVersionInfo() {
    return mathil_info
}

export function getFullVersion(): string {
    return `${mathil_info.name} ${mathil_info.version}, node ${mathil_info.node_version} (${mathil_info.build_date_gmt})`
}

export function getNameVersion(): string {
    return `${mathil_info.name} ${mathil_info.version}`
}

export function getVersion(): string {
    return `${mathil_info.version}`
}

export function getName(): string {
    return `${mathil_info.name}`
}
