"use client";

import { FormEvent, useState } from "react";

import { API_LABEL_STRUCTURE, API_PATHS } from "@/CONSTANTS";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const api = form.api.value;
    const picture = form.picture.files[0];

    if (!api || !picture) {
      alert("Please fill all the fields");
    }

    if (!API_PATHS.includes(api)) {
      alert("Invalid API");
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", picture);

      const response = await fetch(api, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(JSON.stringify(data));
    } catch (error) {
      setResult("An error occured!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-10">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div className="grid items-center gap-1.5">
          <Label htmlFor="api">Choose what u wanna predict</Label>
          <Select name="api">
            <SelectTrigger>
              <SelectValue placeholder="Predict" />
            </SelectTrigger>

            <SelectContent>
              {API_LABEL_STRUCTURE.map((item, index) => (
                <SelectItem key={index} value={item.api}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid items-center gap-1.5">
          <Label htmlFor="picture">Picture</Label>
          <Input id="picture" name="picture" type="file" accept="image/*" />
        </div>

        <Button disabled={loading} type="submit" className="w-full">
          {loading ? "Loading..." : "Submit"}
        </Button>

        {!!result && (
          <p className="font-mono font-bold">
            Result: <code>{result}</code>
          </p>
        )}
      </form>
    </div>
  );
}
