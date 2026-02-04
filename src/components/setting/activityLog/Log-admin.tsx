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

export type GetActivityLog = ({
    user: {
        image: string | null;
        id: string;
        name: string | null;
        email: string | null;
        password: string | null;
        role: Role;
        emailVerified: Date | null;
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
    details: JsonValue | null;
    id: string;
    type: ActivityType;
    userId: string;
    action: string;
    createdAt: Date;
    orderId: string | null;
})[]


export default function LogAdmin({ activityLogs }: { activityLogs: GetActivityLog }) {
    return (
        activityLogs && activityLogs.length > 0 ? (
            <Table className="dark w-8/10 mx-auto">
                <TableCaption>Activity Logs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-25">Type</TableHead>
                        <TableHead>User Name</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Order Id</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {activityLogs.map((log) => (
                        <TableRow key={log.id}>
                            <TableCell>{log.type}</TableCell>
                            <TableCell>{log.user?.name}</TableCell>
                            <TableCell>{log.action}</TableCell>
                            <TableCell>
                                {JSON.stringify(log.details)
                                    .replaceAll('"', '').replaceAll('{', '')
                                    .replaceAll('}', '').replaceAll(',', ', ')}
                            </TableCell>
                            <TableCell>{`${log.createdAt}`}</TableCell>
                            <TableCell>{log.orderId}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>) : <div>No activity logs available</div>

    )
}