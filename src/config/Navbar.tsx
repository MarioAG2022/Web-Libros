import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";
import bookIcon from '../assets/bookIcon.svg';







export default function Navbar  ()  {
	const Navigate = useNavigate();
	

	const start = (
		<img
			alt="logo"
			src={bookIcon}
			className="h-[50px] w-[50px] md:h-[40px] md:w[40px] "
			height="60"
			width="60"
			onClick={() => Navigate("/")}
		></img>

	);
	const end = (
		<div className="flex align-items-center gap-2">
			<a
				href="https://www.facebook.com/sanissaltillo"
				target="_blank"
				rel="noopener noreferrer"
			>
				<i className="pi pi-facebook mr-2"></i>
			</a>

			<a
				href="https://www.instagram.com/sanissaltillo/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<i className="pi pi-instagram mr-2"></i>
			</a>
		</div>
	);




	const items: MenuItem[] = [
		{
			label: "Home",
			icon: "pi pi-home",
			command: () => Navigate("/"),
		},
		{
			label: "Registro",
			icon: "pi pi-megaphone",
			 command: () => Navigate("/Register"),
		},
		
		
	];

	return (
		<div
			className="fixed w-full top-0 left-0 z-50 bg-[#000717] "
			style={{
				display: "flex",
				justifyContent: "center",
			}}
		>
			<div className="absolute inset-0 bg-cover bg-center w-full"></div>
			<div className="relative z-10 w-full ">
				<Menubar
					// className=" w-full"
					model={items}
					start={start}
					end={end}
					style={{
						display: "flex",
						justifyContent: "center",
						// backgroundImage: `url(${backgroundImage})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundColor: "rgba(255, 255, 255, 0.8)",
						backdropFilter: "blur(10px)",
					}}
					menuIcon={
						<i className="pi pi-align-justify custom-menu-icon" />
					}
				/>
			</div>
		</div>
	);
};

