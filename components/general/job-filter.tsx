"use client";

import React, { useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { countryList } from "@/utils/countries-list";
import { useRouter, useSearchParams } from "next/navigation";

const JobTypes = ["full-time", "part-time", "internship", "contract"];

export function JobFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentJobTypes = searchParams.get("jobTypes")?.split(",") || [];
  const currentLocation = searchParams.get("location") || "";

  function clearAllFilters() {
    router.push("/");
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );

  function handleJobTypeChange(jobTyoe: string, chacked: boolean) {
    const current = new Set(currentJobTypes);

    if (chacked) {
      current.add(jobTyoe);
    } else {
      current.delete(jobTyoe);
    }

    const newValue = Array.from(current).join(",");
    router.push(`/?${createQueryString("jobTypes", newValue)}`);
  }

  function handleLocationChange(location: string) {
    router.push(`/?${createQueryString("location", location)}`);
  }

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Filters</CardTitle>
        <Button onClick={clearAllFilters}>
          <span>Clear all</span>
          <XIcon className="size-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label>Job Type</Label>
          <div className="grid grid-cols-2 gap-4">
            {JobTypes.map((job, index) => (
              <div className="flex items-center space-x-2" key={index}>
                <Checkbox
                  id={job}
                  onCheckedChange={(chacked) => {
                    handleJobTypeChange(job, chacked as boolean);
                  }}
                  checked={currentJobTypes.includes(job)}
                />
                <Label htmlFor={job} className="text-sm font-medium">
                  {job}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div>
          <Label>Location</Label>
          <Select
            onValueChange={(location) => {
              handleLocationChange(location);
            }}
            value={currentLocation}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Worldwide</SelectLabel>
                <SelectItem value="worldwide">
                  <span>🌍</span> <span>Worldwide / Remote</span>
                </SelectItem>
              </SelectGroup>

              <SelectGroup>
                <SelectLabel>Location</SelectLabel>
                {countryList.map((country) => (
                  <SelectItem key={country.code} value={country.name}>
                    <span>{country.flagEmoji}</span>
                    <span>{country.name}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Separator />
      </CardContent>
    </Card>
  );
}
