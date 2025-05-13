import Image from "next/image";

const staffs = [
  {
    name: "ISIDORE KIEH",
    position: "Head Coach",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "JUSTINE Z. LAMAH",
    position: "Assistant Coach",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "PETERSON JAMES",
    position: "Goalkeeping Coach",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Marie KOLLIE",
    position: "Team Doctor",
    image: "/placeholder.svg?height=300&width=300",
  },
];

const Staffs = () => {
  return (
    <>
      <div className="mt-20">
        <h2 className="text-2xl font-bold tracking-tight mb-10 text-center">
          Team Staff
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {staffs.map((staff, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden mb-4">
                <Image
                  src={staff.image || "/placeholder.svg"}
                  alt={staff.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">{staff.name}</h3>
              <p className="text-muted-foreground">{staff.position}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Staffs;
