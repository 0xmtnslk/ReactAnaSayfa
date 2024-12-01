import { Avatar, AvatarImage } from "@/components/ui/avatar";

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO",
    avatar: "https://i.pravatar.cc/150?u=1",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    avatar: "https://i.pravatar.cc/150?u=2",
  },
  {
    name: "Emma Davis",
    role: "Head of Design",
    avatar: "https://i.pravatar.cc/150?u=3",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
              alt="Business team meeting"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">About Us</h2>
            <p className="text-muted-foreground mb-6">
              We're a team of passionate individuals dedicated to helping businesses succeed in the digital age. With years of experience and expertise, we deliver innovative solutions that drive growth and efficiency.
            </p>
            
            <div className="grid grid-cols-3 gap-6 mt-12">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <Avatar className="h-20 w-20 mx-auto">
                    <AvatarImage src={member.avatar} alt={member.name} />
                  </Avatar>
                  <h4 className="font-semibold mt-4">{member.name}</h4>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
