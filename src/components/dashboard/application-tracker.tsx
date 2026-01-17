import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { applicationHistory } from "@/lib/mock-data";
import { Target } from "lucide-react";
import type { VariantProps } from "class-variance-authority";

function getStatusVariant(status: (typeof applicationHistory)[number]['status']): VariantProps<typeof badgeVariants>['variant'] {
    switch (status) {
        case 'Offer':
            return 'default';
        case 'Interviewing':
            return 'secondary';
        case 'Applied':
            return 'outline';
        case 'Rejected':
            return 'destructive';
        default:
            return 'outline';
    }
}

export function ApplicationTracker() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Target /> Application Tracker
                </CardTitle>
                <CardDescription>Keep track of all your job applications in one place.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Company</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Date Applied</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applicationHistory.map(app => (
                            <TableRow key={app.id}>
                                <TableCell className="font-medium">{app.company}</TableCell>
                                <TableCell>{app.role}</TableCell>
                                <TableCell className="text-muted-foreground">{app.date}</TableCell>
                                <TableCell className="text-right">
                                    <Badge variant={getStatusVariant(app.status)}>{app.status}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
