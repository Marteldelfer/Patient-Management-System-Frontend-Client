import type {FunctionComponent} from "react";

interface HeaderProps {
	props: Map<string, string>;
	className?: string;
}

interface RowProps {
	props: Map<string, string>;
	className?: string;
	handleEdit: (props: Map<string, string>) => void;
	handleDelete: (props: Map<string, string>) => void;
}

interface TableProps {
	props: Map<string, string>[];
	className?: string;
	handleEdit: (props: Map<string, string>) => void;
	handleDelete: (props: Map<string, string>) => void;
}

const TableHeader: FunctionComponent<HeaderProps> = ({props, className}) => {
	const headers = [...removeId(props).keys()]
	return (
		<>
			<thead className={className}>
			<tr>
				{headers.map((p: string) => <th className={"text-center p-1"} key={p}>{camelCaseToWords(p)}</th>)}
				<th className={"text-center p-1"}>Edit</th>
				<th className={"text-center p-1"}>Delete</th>
			</tr>
			</thead>
		</>
	)
};

const TableRow: FunctionComponent<RowProps> = ({props, className, handleEdit, handleDelete}) => {
	const propsWithouId = removeId(props);
	return (
		<>
			<tr className={className}>
				{[...propsWithouId].map(([key, value]) => <td className={"text-center p-1"} key={key}>{value}</td>)}
				<td className={"text-center p-1"}>
					<button className={"border pl-3 pr-3 rounded-lg border-blue-700 transition-all duration-150 cursor-pointer hover:bg-blue-700 hover:text-white"} onClick={() => handleEdit(props)}>Edit</button>
				</td>
				<td className={"text-center p-1"}>
					<button className={"border pl-3 pr-3 rounded-lg border-red-700 transition-all duration-150 cursor-pointer hover:bg-red-700 hover:text-white"} onClick={() => handleDelete(props)}>Delete</button>
				</td>
			</tr>
		</>
	)
}

const removeId = (objWithId: Map<string, string>): Map<string, string> => {
	const objWithoutId = new Map(objWithId.entries());
	objWithoutId.delete("id");
	return (objWithoutId);
}

const camelCaseToWords = (s: string) => {
	const result = s.replace(/([A-Z])/g, ' $1');
	return result.charAt(0).toUpperCase() + result.slice(1);
}

export const Table: FunctionComponent<TableProps> = ({props, handleEdit, handleDelete}) => {
	const exampleProp: Map<string, string> = props[0]
	return (
		<>
			<div className={"m-auto w-4/5 max-w-5xl p-4 border-2 border-gray-400 rounded-2xl"}>
				<table className={"w-full"}>
					<TableHeader props={exampleProp} className={"border-b-2 border-gray-300"}></TableHeader>
					<tbody>
					{props.map((p) => (
						<TableRow handleEdit={(p) => handleEdit(p)}
											handleDelete={(p) => handleDelete(p)}
											className={"border-b-1 border-gray-300"} key={p.get("id")} props={p}>
						</TableRow>)
					)}
					</tbody>
				</table>
			</div>
		</>
	)
}