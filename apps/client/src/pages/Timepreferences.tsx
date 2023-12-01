import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function TimePreferences() {



    return (


        // SELECT DROP DOWN
        <div className="flex items-center justify-center">
            <div>
                <h1 className="text-3xl text-amber-900 mb-5">Time Preferences</h1>
                <div className="text-center mb-5">
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Pick your preference" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Thursday 2pm to 3pm">Thursday 2pm to 3pm</SelectItem>
                            <SelectItem value="Thursday 2pm to 3pm">Thursday 2pm to 3pm</SelectItem>
                            <SelectItem value="Thursday 2pm to 3pm">Thursday 2pm to 3pm</SelectItem>
                            <SelectItem value="Thursday 2pm to 3pm">Thursday 2pm to 3pm</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div >
                    <Link to="/lunch">
                        <Button className="p-5 m-3">Save Preferences</Button>
                    </Link>
                </div>
            
            </div>
        </div>
    );
}
