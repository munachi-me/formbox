import Link from 'next/link'

export type crumb = {
	name: string;
	href: string;
}

export function Crumbs({crumbs}: crumb[]){
	return(
		<div className="pt-4 px-4 lg:px-8 text-gray-300 text-xs w-full flex flew-wrap items-center gap-2">
			{crumbs.map((c, i) => (
				<div key={i} className="flex gap-2 items-center">
					{i > 0 && <i>/</i>}
					<Link href={c.href} key={i}
					className="hover:text-green-light"
					>
						{c.name}
					</Link>			
				</div>
			))}
		</div>
	)
}