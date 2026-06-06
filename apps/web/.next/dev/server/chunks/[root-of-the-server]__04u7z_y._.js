module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[project]/apps/web/app/api/health-check/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "OPTIONS",
    ()=>OPTIONS,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/stripe/esm/stripe.esm.node.js [app-route] (ecmascript)");
;
;
;
const dynamic = 'force-dynamic';
async function GET() {
    const diagnostics = {};
    // 1. Supabase Health Check
    const supabaseUrl = ("TURBOPACK compile-time value", "https://akkiyacfskmznmjbpvcz.supabase.co");
    const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFra2l5YWNmc2ttem5tamJwdmN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5NjY1NDMsImV4cCI6MjA5MzU0MjU0M30.T7K2EeTfFOXhx2BVsNt7kkBRb5qxAHyo_3CcN-mvINU");
    if ("TURBOPACK compile-time truthy", 1) {
        try {
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
            // Lightweight validation query on profiles table
            const { data, error } = await supabase.from('profiles').select('id').limit(1);
            if (error) {
                diagnostics.supabase = {
                    status: "failed",
                    error: error.message,
                    configured: true
                };
            } else {
                diagnostics.supabase = {
                    status: "success",
                    message: "Successfully connected to Supabase and queried profiles table.",
                    configured: true
                };
            }
        } catch (err) {
            diagnostics.supabase = {
                status: "failed",
                error: err.message || "Unknown error occurred.",
                configured: true
            };
        }
    } else //TURBOPACK unreachable
    ;
    // 2. Stripe Health Check
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (stripeSecretKey) {
        try {
            const stripe = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](stripeSecretKey, {
                apiVersion: "2026-05-27.dahlia"
            });
            // Attempt to retrieve products list to confirm API key authorization
            await stripe.products.list({
                limit: 1
            });
            diagnostics.stripe = {
                status: "success",
                message: "Successfully authenticated Stripe API key and fetched products list.",
                configured: true
            };
        } catch (err) {
            diagnostics.stripe = {
                status: "failed",
                error: err.message || "Unknown Stripe error occurred.",
                configured: true
            };
        }
    } else {
        diagnostics.stripe = {
            status: "not_configured",
            message: "Stripe secret key (STRIPE_SECRET_KEY) is missing.",
            configured: false
        };
    }
    // 3. Vercel Health Check
    const vercelProjectId = process.env.VERCEL_PROJECT_ID;
    const vercelOrgId = process.env.VERCEL_ORG_ID;
    if (vercelProjectId && vercelOrgId) {
        diagnostics.vercel = {
            status: "success",
            message: "Vercel environment variables (VERCEL_PROJECT_ID, VERCEL_ORG_ID) are configured.",
            configured: true
        };
    } else {
        diagnostics.vercel = {
            status: "not_configured",
            message: "Vercel environment variables (VERCEL_PROJECT_ID, VERCEL_ORG_ID) are missing.",
            configured: false
        };
    }
    // Determine overall status
    const services = Object.values(diagnostics);
    const hasFailed = services.some((s)=>s.status === "failed");
    const overallStatus = hasFailed ? "error" : "healthy";
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        status: overallStatus,
        timestamp: new Date().toISOString(),
        diagnostics
    });
    // CORS headers
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response;
}
async function OPTIONS() {
    const response = new Response(null, {
        status: 204
    });
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__04u7z_y._.js.map