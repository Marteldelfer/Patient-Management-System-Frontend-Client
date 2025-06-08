import "../index.css";

export const NavBar = () => {
	return (
		<nav className="bg-white bold font-medium drop-shadow-xl">
			<div className="flex m-auto w-4/5 max-w-5xl">
				<p className="flex-1/3 p-3">Patient Management System</p>
				<ul className="content-end">
					<a href="/patients">
						<li className="inline-flex p-3 transform transition-transform duration-200 hover:scale-120">Patients</li>
					</a>
					<a href="/analytics">
						<li className="inline-flex p-3 transform transition-transform duration-200 hover:scale-120">Analytics</li>
					</a>
				</ul>
			</div>
		</nav>
	)
}