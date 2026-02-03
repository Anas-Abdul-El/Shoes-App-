import { getActivityLog } from '../../../../utils/prisma-function';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ActivityType, Role } from '@/app/generated/prisma/enums';
import { JsonValue } from '@prisma/client/runtime/client';

type GetActivityLog = () => Promise<({
    user: {
        id: string;
        name: string | null;
        email: string | null;
        password: string | null;
        role: Role;
        emailVerified: Date | null;
        image: string | null;
    };
    order: ({
        orderItems: {
            id: string;
            quantity: number;
            price: number;
            orderId: string;
            productId: string;
        }[];
    } & {
        id: string;
        userId: string;
        createdAt: Date;
        totalPrice: number;
    }) | null;
} & {
    id: string;
    type: ActivityType;
    userId: string;
    action: string;
    details: JsonValue | null;
    createdAt: Date;
    orderId: string | null;
})[] | undefined>


function ActivityLog() {
    return (
        getActivityLog().then((activityLogs) => (
            <Table>
                <TableCaption>Activity Logs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>User Name</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Items Orderd</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {activityLogs.length !== 0 && activityLogs.map((log) => (
                        <TableRow key={log.id}>
                            <TableCell>{log.type}</TableCell>
                            <TableCell>{log.user?.name}</TableCell>
                            <TableCell>{log.action}</TableCell>
                            <TableCell>{log.details?.toString()}</TableCell>
                            <TableCell>{`${log.createdAt}`}</TableCell>
                            <TableCell>{log.orderId}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        ))
    )
}

export default ActivityLog
// <Table>
//     <TableCaption>A list of your recent invoices.</TableCaption>
//     <TableHeader>
//         <TableRow>
//             <TableHead className="w-25">Invoice</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead>Method</TableHead>
//             <TableHead className="text-right">Amount</TableHead>
//         </TableRow>
//     </TableHeader>
//     <TableBody>
//         <TableRow>
//             <TableCell className="font-medium">INV001</TableCell>
//             <TableCell>Paid</TableCell>
//             <TableCell>Credit Card</TableCell>
//             <TableCell className="text-right">$250.00</TableCell>
//         </TableRow>
//     </TableBody>
// </Table>