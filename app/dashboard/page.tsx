import Component1 from "@/components/Component1"
import Component2 from "@/components/Component2"
import Component3 from "@/components/Component3"
import Component4 from "@/components/Component4"
import Component5 from "@/components/Component5"
import Component6 from "@/components/Component6"

export default function Dashboard() {
    return (
        <div className="grid grid-cols-3 gap-6">
            <Component1 />
            <Component2 />
            <Component3 />
            <Component4 />
            <Component5 />
            <Component6 />
        </div>
    )
}

