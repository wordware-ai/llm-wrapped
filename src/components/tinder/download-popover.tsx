import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";

export default function DownloadPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link" className="w-full text-white">
          How to download your Tinder data
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[600px] p-4">
        <div className="space-y-3">
          <h3 className="font-medium">
            How to get my Tinder data? Step-by-step guide ✨
          </h3>
          <ol className="list-decimal space-y-2 pl-4 text-sm">
            <li>
              Go to https://account.gotinder.com/data. This is where you can
              manage your Tinder account outside the app.
            </li>
            <li>
              Log in with the same Facebook, Google, or phone number you used on
              Tinder.
            </li>
            <li>Click on &quot;Download My Information.&quot;</li>
            <li>
              Enter your email address in both fields. Tinder will send you the
              data to this address.
            </li>
            <li>
              Click &quot;Submit&quot; and you&apos;ve initiated the request.
              Tinder will soon send you an email that contains a download link
              to your data.
            </li>
            <li>
              Once you get an email with your data, open Tinder&apos;s email and
              click on the download link within 24 hours of receiving the email.
              The download link is at the bottom of the email.
            </li>
            <li>
              Log into your account as you did the first time when you requested
              the data.
            </li>
            <li>
              After logging in, your data (myData.zip) will automatically
              download. Please unzip and open the file.
            </li>
            <li>
              Now, you can upload the data.json file to Tinder Wrapped and view
              your analysis!
            </li>
          </ol>
        </div>
      </PopoverContent>
    </Popover>
  );
}
