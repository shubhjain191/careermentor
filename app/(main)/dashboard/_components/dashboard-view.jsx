"use client";

import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import {
    BriefcaseIcon,
    LineChart,
    TrendingUp,
    TrendingDown,
    Brain,
    Calendar,
    BarChart3,
    PlusCircle,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const DashboardView = ({ insights }) => {
    // Transform salary data for the chart
    const salaryData = insights.salaryRanges.map((range) => ({
        name: range.role,
        min: range.min / 1000,
        max: range.max / 1000,
        median: range.median / 1000,
    }));

    const getDemandLevelColor = (level) => {
        switch (level.toLowerCase()) {
            case "high":
                return "bg-emerald-500";
            case "medium":
                return "bg-amber-500";
            case "low":
                return "bg-rose-500";
            default:
                return "bg-slate-500";
        }
    };

    const getDemandLevelTextColor = (level) => {
        switch (level.toLowerCase()) {
            case "high":
                return "text-emerald-600";
            case "medium":
                return "text-amber-600";
            case "low":
                return "text-rose-600";
            default:
                return "text-slate-600";
        }
    };

    const getMarketOutlookInfo = (outlook) => {
        switch (outlook.toLowerCase()) {
            case "positive":
                return {
                    icon: TrendingUp,
                    color: "text-emerald-500",
                    bgColor: "bg-emerald-50",
                    borderColor: "border-emerald-200",
                    textColor: "text-emerald-700"
                };
            case "neutral":
                return {
                    icon: LineChart,
                    color: "text-amber-500",
                    bgColor: "bg-amber-50",
                    borderColor: "border-amber-200",
                    textColor: "text-amber-700"
                };
            case "negative":
                return {
                    icon: TrendingDown,
                    color: "text-rose-500",
                    bgColor: "bg-rose-50",
                    borderColor: "border-rose-200",
                    textColor: "text-rose-700"
                };
            default:
                return {
                    icon: LineChart,
                    color: "text-slate-500",
                    bgColor: "bg-slate-50",
                    borderColor: "border-slate-200",
                    textColor: "text-slate-700"
                };
        }
    };

    const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
    const outlookInfo = getMarketOutlookInfo(insights.marketOutlook);

    // Format dates using date-fns
    const lastUpdatedDate = format(new Date(insights.lastUpdated), "MMM d, yyyy");
    const nextUpdateDistance = formatDistanceToNow(
        new Date(insights.nextUpdate),
        { addSuffix: true }
    );

    // Diverse color palette for the bar chart
    const barColors = ["#0ea5e9", "#8b5cf6", "#f59e0b"];

    // Growth rate visualization
    const getGrowthRateDisplay = (rate) => {
        const color = rate >= 8 ? "text-emerald-500" : rate >= 4 ? "text-amber-500" : "text-rose-500";
        const fillColor = rate >= 8 ? "bg-emerald-500" : rate >= 4 ? "bg-amber-500" : "bg-rose-500";
        const bgColor = rate >= 8 ? "bg-emerald-100" : rate >= 4 ? "bg-amber-100" : "bg-rose-100";

        return { color, fillColor, bgColor };
    };

    const growthRateColors = getGrowthRateDisplay(insights.growthRate);

    return (
        <div className="min-h-screen w-full p-0">
            <div className="p-6 lg:p-8 space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Market Insights</h1>
                        <p className="text-muted-foreground mt-1 text-lg">
                            Industry analysis and career opportunities
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-indigo-500" />
                        <Badge variant="outline" className="font-medium text-sm border-indigo-200">
                            Updated: {lastUpdatedDate}
                        </Badge>
                    </div>
                </div>

                <Separator />

                {/* Market Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className={`shadow-md border-l-4 ${outlookInfo.borderColor}`}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Market Outlook
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className={`text-2xl font-bold ${outlookInfo.textColor}`}>
                                    {insights.marketOutlook}
                                </div>
                                <div className={`p-2 rounded-full ${outlookInfo.bgColor}`}>
                                    <OutlookIcon className={`h-6 w-6 ${outlookInfo.color}`} />
                                </div>
                            </div>
                            <div className={`mt-4 p-2 rounded-md ${outlookInfo.bgColor} ${outlookInfo.textColor} text-sm`}>
                                Industry confidence is {insights.marketOutlook.toLowerCase()}
                            </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Next update {nextUpdateDistance}
                            </p>
                        </CardFooter>
                    </Card>

                    <Card className={`shadow-md border-l-4 ${outlookInfo.borderColor}`}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Industry Growth
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between mb-3">
                                <div className={`text-2xl font-bold ${growthRateColors.color}`}>
                                    {insights.growthRate.toFixed(1)}%
                                </div>
                                <div className={`p-2 rounded-full ${growthRateColors.bgColor}`}>
                                    <TrendingUp className={`h-6 w-6 ${growthRateColors.color}`} />
                                </div>
                            </div>

                            <Progress
                                value={Math.min(insights.growthRate * 5, 100)}
                                className="mt-2 h-10 rounded-lg"
                                indicatorClassName={growthRateColors.fillColor}
                            />
                            <div className="mt-1 flex items-center justify-between px-3">
                                <span className="text-xs font-semibold">0%</span>
                                <span className="text-xs font-semibold">10%</span>
                                <span className="text-xs font-semibold">20%</span>
                            </div>

                            <p className="text-sm mt-2 text-muted-foreground">
                                Annual growth rate projection
                            </p>
                        </CardContent>
                    </Card>

                    <Card className={`shadow-md border-l-4 ${outlookInfo.borderColor}`}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Demand Level
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between mb-3">
                                <div className={`text-2xl font-bold ${getDemandLevelTextColor(insights.demandLevel)}`}>
                                    {insights.demandLevel}
                                </div>
                                <div className={`p-2 rounded-full bg-indigo-50`}>
                                    <BriefcaseIcon className="h-6 w-6 text-indigo-500" />
                                </div>
                            </div>

                            {/* Enhanced demand visualization */}
                            <div className="flex items-center w-full mt-2 mb-1 gap-1">
                                <div className={`h-3 w-1/3 rounded-l-full ${insights.demandLevel.toLowerCase() === "low" ? getDemandLevelColor(insights.demandLevel) : "bg-gray-200"}`}></div>
                                <div className={`h-3 w-1/3 ${insights.demandLevel.toLowerCase() === "medium" ? getDemandLevelColor(insights.demandLevel) : "bg-gray-200"}`}></div>
                                <div className={`h-3 w-1/3 rounded-r-full ${insights.demandLevel.toLowerCase() === "high" ? getDemandLevelColor(insights.demandLevel) : "bg-gray-200"}`}></div>
                            </div>

                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>Low</span>
                                <span>Medium</span>
                                <span>High</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className={`shadow-md border-l-4 ${outlookInfo.borderColor}`}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Top Skills
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-lg font-semibold text-purple-700">In-demand</span>
                                <div className="p-2 rounded-full bg-purple-50">
                                    <Brain className="h-6 w-6 text-purple-500" />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {insights.topSkills.map((skill, index) => {
                                    // Assign different colors to each skill badge
                                    const colors = [
                                        "bg-blue-100 text-blue-800",
                                        "bg-purple-100 text-purple-800",
                                        "bg-emerald-100 text-emerald-800",
                                        "bg-amber-100 text-amber-800",
                                        "bg-rose-100 text-rose-800",
                                        "bg-indigo-100 text-indigo-800"
                                    ];
                                    const colorIndex = index % colors.length;

                                    return (
                                        <Badge
                                            key={skill}
                                            variant="secondary"
                                            className={`px-2.5 py-1 ${colors[colorIndex]} hover:opacity-90 transition-opacity`}
                                        >
                                            {skill}
                                        </Badge>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Salary Ranges Chart */}
                <Card className="shadow-lg border-t-4 border-indigo-400">
                    <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl">Salary Ranges by Role</CardTitle>
                                <CardDescription className="mt-1">
                                    Displaying minimum, median, and maximum salaries (in thousands)
                                </CardDescription>
                            </div>
                            <div className="p-2 rounded-full bg-indigo-100">
                                <BarChart3 className="h-6 w-6 text-indigo-600" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[450px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={salaryData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis
                                        dataKey="name"
                                        tick={{ fill: '#334155', fontWeight: 500 }}
                                        axisLine={{ stroke: '#cbd5e1' }}
                                    />
                                    <YAxis
                                        tick={{ fill: '#64748b' }}
                                        axisLine={{ stroke: '#cbd5e1' }}
                                        tickFormatter={(value) => `$${value}K`}
                                    />
                                    <Tooltip
                                        content={({ active, payload, label }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="bg-white border rounded-lg p-4 shadow-xl">
                                                        <p className="font-semibold text-slate-900 mb-3 text-lg">{label}</p>
                                                        {payload.map((item, index) => (
                                                            <p key={item.name} className="text-sm flex items-center text-slate-400 gap-2 mb-2">
                                                                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: barColors[index] }}></span>
                                                                <span className="font-medium">{item.name.replace(' (K)', '')}:</span>
                                                                <span className="font-bold">${item.value.toLocaleString()}K</span>
                                                            </p>
                                                        ))}
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Legend
                                        formatter={(value) => <span className="text-sm font-medium text-slate-700">{value}</span>}
                                        iconType="circle"
                                        iconSize={10}
                                        wrapperStyle={{ paddingTop: 20 }}
                                    />
                                    <Bar dataKey="min" fill="#0ea5e9" name="Min Salary (K)" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="median" fill="#8b5cf6" name="Median Salary (K)" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="max" fill="#f59e0b" name="Max Salary (K)" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Industry Trends */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="shadow-md border-t-4 border-teal-400">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-xl">Key Industry Trends</CardTitle>
                                    <CardDescription className="mt-1">
                                        Current trends shaping the industry
                                    </CardDescription>
                                </div>
                                <div className="p-2 rounded-full bg-teal-100">
                                    <TrendingUp className="h-6 w-6 text-teal-600" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {insights.keyTrends.map((trend, index) => {
                                    // Different colors for trend items
                                    const colors = [
                                        "bg-blue-100 text-blue-800",
                                        "bg-teal-100 text-teal-800",
                                        "bg-amber-100 text-amber-800",
                                        "bg-purple-100 text-purple-800"
                                    ];
                                    const colorIndex = index % colors.length;

                                    return (
                                        <li key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                            <div className={`h-6 w-6 flex items-center justify-center rounded-full ${colors[colorIndex]}`}>
                                                {index + 1}
                                            </div>
                                            <span className="text-slate-500">{trend}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md border-t-4 border-blue-400">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-xl">Recommended Skills</CardTitle>
                                    <CardDescription className="mt-1">
                                        Skills to consider developing
                                    </CardDescription>
                                </div>
                                <div className="p-2 rounded-full bg-blue-100">
                                    <Brain className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-3">
                                {insights.recommendedSkills.map((skill, index) => {
                                    // Different colors for skill badges
                                    const colors = [
                                        "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100",
                                        "bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100",
                                        "bg-teal-50 border-teal-200 text-teal-700 hover:bg-teal-100",
                                        "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100",
                                        "bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100",
                                        "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                                    ];
                                    const colorIndex = index % colors.length;

                                    return (
                                        <Badge
                                            key={skill}
                                            variant="outline"
                                            className={`px-3 py-2 text-sm ${colors[colorIndex]} transition-colors flex items-center gap-1.5`}
                                        >
                                            <PlusCircle className="h-3.5 w-3.5" />
                                            {skill}
                                        </Badge>
                                    );
                                })}
                            </div>
                        </CardContent>
                        <CardFooter className="border-t pt-4 mt-4">
                            <p className="text-sm text-muted-foreground">
                                These skills are projected to be in high demand over the next 6-12 months.
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardView;