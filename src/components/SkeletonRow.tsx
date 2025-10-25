import { fillArray } from "@alextheman/utility";
import Skeleton from "@mui/material/Skeleton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export interface SkeletonRowProps {
  columns: number;
}

function SkeletonRow({ columns }: SkeletonRowProps) {
  return (
    <TableRow>
      {fillArray((index) => {
        return (
          <TableCell key={index}>
            <Skeleton />
          </TableCell>
        );
      }, columns)}
    </TableRow>
  );
}

export default SkeletonRow;
