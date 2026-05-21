"use client";

import { useState } from "react";

import { supabase } from "@/lib/supabase";

export default function TradeForm() {

  // FORM STATES

  const [stockName, setStockName] =
    useState("");

  const [side, setSide] =
    useState("BUY");

  const [quantity, setQuantity] =
    useState("");

  const [entryPrice, setEntryPrice] =
    useState("");

  const [brokerage, setBrokerage] =
    useState("");

  const [taxes, setTaxes] =
    useState("");

  const [segment, setSegment] =
    useState("Equity");

  const [note, setNote] =
    useState("");

  // IMAGE

  const [imageFile, setImageFile] =
    useState<File | null>(
      null
    );

  const [imagePreview, setImagePreview] =
    useState("");

  // LOADING

  const [loading, setLoading] =
    useState(false);

  // IMAGE CHANGE

  const handleImageChange =
    (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {

      const file =
        e.target.files?.[0];

      if (!file)
        return;

      setImageFile(file);

      // PREVIEW

      const imageUrl =
        URL.createObjectURL(
          file
        );

      setImagePreview(
        imageUrl
      );
    };

  // IMAGE UPLOAD

  const uploadImage =
    async () => {

      if (!imageFile)
        return "";

      const fileExt =
        imageFile.name.split(
          "."
        ).pop();

      const fileName =

        `${Date.now()}.${fileExt}`;

      // UPLOAD

      const { error } =
        await supabase.storage

          .from(
            "trade-screenshots"
          )

          .upload(
            fileName,
            imageFile
          );

      if (error) {

        console.error(
          error
        );

        alert(
          "Image upload failed ❌"
        );

        return "";
      }

      // PUBLIC URL

      const {
        data,
      } = supabase.storage

        .from(
          "trade-screenshots"
        )

        .getPublicUrl(
          fileName
        );

      return data.publicUrl;
    };

  // SUBMIT

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      setLoading(true);

      // USER

      const {

        data: {
          user,
        },

      } = await supabase.auth.getUser();

      if (!user) {

        alert(
          "User not found ❌"
        );

        setLoading(false);

        return;
      }

      // IMAGE URL

      let screenshotUrl =
        "";

      if (imageFile) {

        screenshotUrl =
          await uploadImage();
      }

      // INSERT

      const { error } =
        await supabase

          .from("trades")

          .insert([

            {

              user_id:
                user.id,

              stock_name:
                stockName,

              side,

              quantity:
                Number(
                  quantity
                ),

              entry_price:
                Number(
                  entryPrice
                ),

              brokerage:
                Number(
                  brokerage || 0
                ),

              taxes:
                Number(
                  taxes || 0
                ),

              segment,

              note,

              screenshot_url:
                screenshotUrl,

              status:
                "open",
            },

          ]);

      if (error) {

        console.error(
          error
        );

        alert(
          "Failed to save trade ❌"
        );

        setLoading(false);

        return;
      }

      // SUCCESS

      alert(
        "Trade Added Successfully ✅"
      );

      // RESET

      setStockName("");

      setSide("BUY");

      setQuantity("");

      setEntryPrice("");

      setBrokerage("");

      setTaxes("");

      setSegment("Equity");

      setNote("");

      setImageFile(null);

      setImagePreview("");

      setLoading(false);

      // RELOAD

      window.location.reload();
    };

  return (

    <div className="bg-white rounded-3xl shadow-lg border border-pink-100 p-6">

      {/* HEADER */}

      <div className="mb-6">

        <h2 className="text-3xl font-bold text-zinc-800">

          Add New Trade

        </h2>

        <p className="text-zinc-500 mt-2">

          Professional AI powered trading journal system.

        </p>

      </div>

      {/* FORM */}

      <form

        onSubmit={
          handleSubmit
        }

        className="space-y-6"
      >

        {/* ROW 1 */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* STOCK */}

          <div>

            <label className="block text-sm font-semibold text-zinc-700 mb-2">

              Stock Name

            </label>

            <input

              type="text"

              placeholder="RELIANCE"

              value={stockName}

              onChange={(e) =>
                setStockName(
                  e.target.value
                )
              }

              required

              className="w-full border border-pink-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
            />

          </div>

          {/* SIDE */}

          <div>

            <label className="block text-sm font-semibold text-zinc-700 mb-2">

              Side

            </label>

            <select

              value={side}

              onChange={(e) =>
                setSide(
                  e.target.value
                )
              }

              className="w-full border border-pink-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
            >

              <option value="BUY">

                BUY

              </option>

              <option value="SELL">

                SELL

              </option>

            </select>

          </div>

          {/* QUANTITY */}

          <div>

            <label className="block text-sm font-semibold text-zinc-700 mb-2">

              Quantity

            </label>

            <input

              type="number"

              placeholder="10"

              value={quantity}

              onChange={(e) =>
                setQuantity(
                  e.target.value
                )
              }

              required

              className="w-full border border-pink-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
            />

          </div>

          {/* ENTRY */}

          <div>

            <label className="block text-sm font-semibold text-zinc-700 mb-2">

              Entry Price

            </label>

            <input

              type="number"

              step="0.01"

              placeholder="2500"

              value={entryPrice}

              onChange={(e) =>
                setEntryPrice(
                  e.target.value
                )
              }

              required

              className="w-full border border-pink-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
            />

          </div>

        </div>

        {/* ROW 2 */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* BROKERAGE */}

          <div>

            <label className="block text-sm font-semibold text-zinc-700 mb-2">

              Brokerage

            </label>

            <input

              type="number"

              step="0.01"

              placeholder="20"

              value={brokerage}

              onChange={(e) =>
                setBrokerage(
                  e.target.value
                )
              }

              className="w-full border border-pink-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
            />

          </div>

          {/* TAXES */}

          <div>

            <label className="block text-sm font-semibold text-zinc-700 mb-2">

              Taxes

            </label>

            <input

              type="number"

              step="0.01"

              placeholder="15"

              value={taxes}

              onChange={(e) =>
                setTaxes(
                  e.target.value
                )
              }

              className="w-full border border-pink-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
            />

          </div>

          {/* SEGMENT */}

          <div>

            <label className="block text-sm font-semibold text-zinc-700 mb-2">

              Segment

            </label>

            <select

              value={segment}

              onChange={(e) =>
                setSegment(
                  e.target.value
                )
              }

              className="w-full border border-pink-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
            >

              <option value="Equity">

                Equity

              </option>

              <option value="Options">

                Options

              </option>

              <option value="Futures">

                Futures

              </option>

              <option value="Crypto">

                Crypto

              </option>

              <option value="Forex">

                Forex

              </option>

            </select>

          </div>

        </div>

        {/* NOTES */}

        <div>

          <label className="block text-sm font-semibold text-zinc-700 mb-2">

            Trade Notes

          </label>

          <textarea

            placeholder="Write your setup, psychology, confirmations, emotions, mistakes..."

            value={note}

            onChange={(e) =>
              setNote(
                e.target.value
              )
            }

            rows={5}

            className="w-full border border-pink-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400 resize-none"
          />

        </div>

        {/* IMAGE UPLOAD */}

        <div>

          <label className="block text-sm font-semibold text-zinc-700 mb-3">

            Upload Trade Screenshot

          </label>

          <div className="border-2 border-dashed border-pink-300 rounded-3xl p-8 bg-pink-50 text-center">

            <input

              type="file"

              accept="image/*"

              onChange={
                handleImageChange
              }

              className="w-full"
            />

            <p className="text-zinc-500 mt-3 text-sm">

              Upload chart screenshot, setup image, trading confirmation etc.

            </p>

          </div>

        </div>

        {/* PREVIEW */}

        {imagePreview && (

          <div className="border border-pink-100 rounded-3xl p-4 bg-pink-50">

            <p className="text-sm font-semibold text-zinc-700 mb-3">

              Screenshot Preview

            </p>

            <img

              src={imagePreview}

              alt="Trade Screenshot"

              className="w-full max-h-[450px] object-cover rounded-2xl border border-pink-200 shadow-md"
            />

          </div>
        )}

        {/* SUBMIT */}

        <button

          type="submit"

          disabled={loading}

          className={`

            w-full
            py-4
            rounded-2xl
            font-bold
            text-lg
            text-white
            transition-all
            duration-300
            shadow-lg

            ${
              loading

                ? "bg-zinc-400 cursor-not-allowed"

                : "bg-pink-500 hover:bg-pink-600"
            }

          `}
        >

          {loading

            ? "Saving Trade..."

            : "Add Trade"}

        </button>

      </form>

    </div>
  );
}