"use client";

import { useCardStore } from "@/context/card/useCardStore";
import { Button } from "@nextui-org/button";
import { Download, Share2 } from "lucide-react";
import UploadAssetDialog from "../application/UploadAssetDialog";

type Props = {
  view: "edit" | "preview";
};

export const CardTemplate = ({ view }: Props) => {
  const { state, actions } = useCardStore();

  return (
    <div className="w-full max-w-md m-auto bg-slate-100 overflow-clip pb-10 rounded-3xl relative h-auto min-h-[100%]">
      <div className="w-full h-80 relative">
        <div className="w-full h-full bg-slate-300 shadow rounded-none group/cover object-center overflow-clip object-cover rounded-b-3xl">
          <img
            alt={state.title}
            src={state.cover?.base64Content || state.cover?.url}
            className="w-full h-full rounded-none object-center object-cover"
          />
          {view === "edit" && (
            <div className="rounded-md hidden group-hover/cover:block absolute right-2 bottom-2 z-30">
              <UploadAssetDialog
                onSuccess={(i) =>
                  actions.setState({ cover: { base64Content: i } })
                }
              />
            </div>
          )}
        </div>

        <div className="w-36 h-36 z-10 bg-slate-200 shadow group/avatar overflow-hidden rounded-3xl absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2">
          <img
            alt={state.title}
            src={state.avatar?.base64Content || state.avatar?.url}
            className="w-full h-full aspect-square object-center object-cover"
          />
          {view === "edit" && (
            <div className="rounded-md hidden group-hover/avatar:block absolute right-2 bottom-2 z-30">
              <UploadAssetDialog
                onSuccess={(i) =>
                  actions.setState({ avatar: { base64Content: i } })
                }
              />
            </div>
          )}
        </div>
      </div>
      <div className="mt-24 text-black text-center mb-5">
        <h4 className="text-2xl font-bold">{state.title}</h4>
        <p className="m-auto mb-1 text-sm">{state.description}</p>
        <div className="flex items-center justify-center text-sm font-bold">
          {state.organization}
        </div>
      </div>
      <div className="w-full flex flex-col max-w-sm m-auto items-center gap-2">
        {state.settings?.showContactButton && (
          <Button
            startContent={<Download className="w-4" />}
            className="w-full"
            color="primary"
          >
            Save to Contacts
          </Button>
        )}

        {state.settings?.showShareButton && (
          <Button
            startContent={<Share2 className="w-4" />}
            className="w-full"
            color="primary"
          >
            Share Card
          </Button>
        )}
      </div>

      {state.modules?.bio && (
        <div className="w-full m-auto rounded-large max-w-sm bg-slate-200 shadow-md p-5 mt-5 text-black">
          <div
            className="text-center text-sm"
            dangerouslySetInnerHTML={{ __html: state.modules.bio }}
          ></div>
        </div>
      )}
    </div>
  );
};
