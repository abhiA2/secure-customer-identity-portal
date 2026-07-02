export type DashboardResponse = {
    message: string;
    status: string;
    timestamp: string;
};

export type ProfileResponse = {
    subject: string;
    issuer: string;
    audience: string[];
    authorities: string[];
};

export type AdminSummaryResponse = {
    message: string;
    activeSessions: number;
    failedLoginAlerts: number;
}

