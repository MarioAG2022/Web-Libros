import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";
import bookIcon from '../assets/bookIcon.svg';
import { Avatar } from "primereact/avatar";


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
			<Avatar
				icon="pi pi-user"
				size="large"
				shape="circle"
				className="cursor-pointer"
				onClick={() => Navigate("/userProfile")} // Cambia "/user-profile" por la ruta de perfil
			/>
		</div>
	);

	const items: MenuItem[] = [
		{
			label: "Home",
			icon: "pi pi-home",
			className:"text-lg",
			command: () => Navigate("/"),
		},
		{
			label: "Registro",
			className:"text-lg",
			icon: "pi pi-user-plus",
			 command: () => Navigate("/Register"),
		},
		
		
	];

	return (
		
			<div className="relative z-10 w-full ">
				<Menubar
					model={items}
					start={start}
					end={end}
					style={{
						display: "flex",
						justifyContent: "center",
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundColor: "rgba(255, 255, 255, 0.8)",
						backdropFilter: "blur(10px)",
					}}
					menuIcon={
						<i className="pi pi-align-justify text-xl" />
					}
				/>
			</div>
	
	);
};

