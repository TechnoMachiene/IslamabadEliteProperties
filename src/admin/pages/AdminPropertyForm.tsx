"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ImagePlus, Plus, Trash2 } from "lucide-react";
import { usePropertyStore } from "@/store/PropertyStoreContext";
import { cities, getCityBySlug } from "@/data/cities";
import type { Property } from "@/data/properties";

// ─── Utilities ────────────────────────────────────────────────────────────────
const formatPrice = (price: number): string => {
  if (price <= 0) return "";
  const crore = price / 10_000_000;
  if (crore >= 1) return `${Number.isInteger(crore) ? crore : crore.toFixed(1)} Crore`;
  const lakh = price / 100_000;
  return `${lakh.toFixed(0)} Lakh`;
};

type FormState = Omit<Property, "id">;
type Errors    = Partial<Record<keyof FormState | "image0", string>>;

const emptyForm: FormState = {
  city: "", sector: "", subSector: "", title: "", description: "",
  price: 0, priceFormatted: "", area: "", areaUnit: "Marla",
  bedrooms: 3, bathrooms: 3, parking: 1, yearBuilt: 2022,
  type: "House", features: [], images: [""], videoUrl: "",
  isFeatured: false, agentPhone: "+923062091111",
};

// ─── Component ────────────────────────────────────────────────────────────────
const AdminPropertyForm = () => {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const { properties, addProperty, updateProperty } = usePropertyStore();

  const isEdit     = !!id;
  const existing   = isEdit ? properties.find((p) => p.id === id) : undefined;

  const [form,     setForm]     = useState<FormState>(existing ?? emptyForm);
  const [errors,   setErrors]   = useState<Errors>({});
  const [saving,   setSaving]   = useState(false);
  const [featuresInput, setFeaturesInput] = useState((existing?.features ?? []).join(", "));

  // ── Dynamic selects ──────────────────────────────────────────────────────
  const cityObj        = getCityBySlug(form.city);
  const availSectors   = cityObj?.sectors ?? [];
  const sectorObj      = availSectors.find((s) => s.name === form.sector);
  const availSubSects  = sectorObj?.subSectors ?? [];

  // ── Validation ───────────────────────────────────────────────────────────
  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.title.trim())            e.title        = "Title is required.";
    if (!form.description.trim())      e.description  = "Description is required.";
    if (!form.city)                    e.city         = "Select a city.";
    if (!form.sector)                  e.sector       = "Select a sector.";
    if (!form.price || form.price <= 0) e.price       = "Enter a valid price.";
    if (!form.area.trim())             e.area         = "Area is required.";
    if (!form.images[0]?.trim())       e.image0       = "At least one image URL is required.";
    return e;
  };

  // ── Helpers ──────────────────────────────────────────────────────────────
  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handlePriceChange = (raw: string) => {
    const n = parseFloat(raw.replace(/[^0-9.]/g, ""));
    set("price", isNaN(n) ? 0 : n);
    set("priceFormatted", formatPrice(isNaN(n) ? 0 : n));
  };

  const handleCityChange = (citySlug: string) => {
    setForm((prev) => ({ ...prev, city: citySlug, sector: "", subSector: "" }));
  };

  const handleSectorChange = (sectorName: string) =>
    setForm((prev) => ({ ...prev, sector: sectorName, subSector: "" }));

  const handleImageChange = (idx: number, val: string) => {
    const imgs = [...form.images];
    imgs[idx] = val;
    set("images", imgs);
  };

  const addImage = () => {
    if (form.images.length < 5) set("images", [...form.images, ""]);
  };

  const removeImage = (idx: number) => {
    if (form.images.length <= 1) return;
    set("images", form.images.filter((_, i) => i !== idx));
  };

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSaving(true);
    const featuresArr = featuresInput.split(",").map((f) => f.trim()).filter(Boolean);
    const cleanImages = form.images.filter((img) => img.trim());
    const payload: FormState = { ...form, features: featuresArr, images: cleanImages };

    try {
      if (isEdit && id) {
        await updateProperty(id, payload);
      } else {
        await addProperty(payload);
      }
      navigate("/properties");
    } catch (error: unknown) {
      console.error("❌ Form submission error:", error);
      setErrors({ title: "Failed to save. Check console for details." });
    } finally {
      setSaving(false);
    }
  };

  // ── Field styles ─────────────────────────────────────────────────────────
  const inputClass = (err?: string) =>
    `w-full h-10 px-3 rounded-lg border text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all ${err ? "border-red-400" : "border-slate-200"}`;

  const selectClass = (err?: string) =>
    `w-full h-10 px-3 rounded-lg border text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all ${err ? "border-red-400" : "border-slate-200"}`;

  return (
    <>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-7">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {isEdit ? "Edit Property" : "Add New Property"}
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {isEdit ? `Editing: ${existing?.title ?? id}` : "Fill in the details below"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ── Location ─────────────────────────────────────────────────── */}
          <fieldset className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <legend className="text-base font-semibold text-slate-900 mb-4">Location</legend>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* City */}
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">City *</label>
                <select value={form.city} onChange={(e) => handleCityChange(e.target.value)} className={selectClass(errors.city)}>
                  <option value="">Select city…</option>
                  {cities.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                </select>
                {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
              </div>

              {/* Sector */}
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">Sector *</label>
                <select
                  value={form.sector}
                  onChange={(e) => handleSectorChange(e.target.value)}
                  disabled={!form.city}
                  className={`${selectClass(errors.sector)} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <option value="">Select sector…</option>
                  {availSectors.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
                </select>
                {errors.sector && <p className="mt-1 text-xs text-red-500">{errors.sector}</p>}
              </div>

              {/* Sub-sector */}
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">Sub-sector</label>
                <select
                  value={form.subSector}
                  onChange={(e) => set("subSector", e.target.value)}
                  disabled={!form.sector || availSubSects.length === 0}
                  className={`${selectClass()} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <option value="">None / all sub-sectors</option>
                  {availSubSects.map((ss) => <option key={ss.slug} value={ss.name}>{ss.name}</option>)}
                </select>
              </div>
            </div>
          </fieldset>

          {/* ── Basic details ──────────────────────────────────────────────── */}
          <fieldset className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <legend className="text-base font-semibold text-slate-900 mb-4">Property Details</legend>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="e.g. Modern Luxury Villa in F-7"
                  className={inputClass(errors.title)}
                  maxLength={100}
                />
                {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">Description *</label>
                <textarea
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  rows={4}
                  placeholder="Describe the property in detail…"
                  className={`w-full px-3 py-2 rounded-lg border text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 resize-none ${errors.description ? "border-red-400" : "border-slate-200"}`}
                />
                {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1.5">Type *</label>
                  <select value={form.type} onChange={(e) => set("type", e.target.value as Property["type"])} className={selectClass()}>
                    {["House","Villa","Apartment","Penthouse","Bungalow"].map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1.5">Area *</label>
                  <input type="text" value={form.area} onChange={(e) => set("area", e.target.value)} placeholder="e.g. 1, 10, 12" className={inputClass(errors.area)} />
                  {errors.area && <p className="mt-1 text-xs text-red-500">{errors.area}</p>}
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1.5">Area Unit</label>
                  <select value={form.areaUnit} onChange={(e) => set("areaUnit", e.target.value as "Marla" | "Kanal")} className={selectClass()}>
                    <option value="Marla">Marla</option>
                    <option value="Kanal">Kanal</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1.5">Year Built</label>
                  <input type="number" value={form.yearBuilt} onChange={(e) => set("yearBuilt", parseInt(e.target.value) || 2022)} min={1980} max={2030} className={inputClass()} />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1.5">Bedrooms</label>
                  <input type="number" value={form.bedrooms} min={1} max={20} onChange={(e) => set("bedrooms", parseInt(e.target.value) || 1)} className={inputClass()} />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1.5">Bathrooms</label>
                  <input type="number" value={form.bathrooms} min={1} max={20} onChange={(e) => set("bathrooms", parseInt(e.target.value) || 1)} className={inputClass()} />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1.5">Parking</label>
                  <input type="number" value={form.parking} min={0} max={10} onChange={(e) => set("parking", parseInt(e.target.value) || 0)} className={inputClass()} />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1.5">Agent Phone</label>
                  <input type="tel" value={form.agentPhone} onChange={(e) => set("agentPhone", e.target.value)} className={inputClass()} />
                </div>
              </div>
            </div>
          </fieldset>

          {/* ── Pricing ───────────────────────────────────────────────────── */}
          <fieldset className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <legend className="text-base font-semibold text-slate-900 mb-4">Pricing</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">Price (PKR) *</label>
                <input
                  type="number"
                  value={form.price || ""}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  placeholder="e.g. 18000000"
                  min={0}
                  className={inputClass(errors.price)}
                />
                {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">Price Display</label>
                <input
                  type="text"
                  value={form.priceFormatted}
                  onChange={(e) => set("priceFormatted", e.target.value)}
                  placeholder="Auto-calculated"
                  className={inputClass()}
                />
                <p className="mt-1 text-xs text-slate-400">Auto-filled from price. Override if needed.</p>
              </div>
            </div>
          </fieldset>

          {/* ── Video ────────────────────────────────────────────────────── */}
          <fieldset className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <legend className="text-base font-semibold text-slate-900 mb-4">Video</legend>
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1.5">Video URL</label>
              <input
                type="url"
                value={form.videoUrl}
                onChange={(e) => set("videoUrl", e.target.value)}
                placeholder="e.g. https://www.youtube.com/embed/dQw4w9WgXcQ"
                className={inputClass()}
              />
              <p className="mt-1 text-xs text-slate-400">YouTube embed URL or direct video link</p>
            </div>
          </fieldset>

          {/* ── Images ───────────────────────────────────────────────────── */}
          <fieldset className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <legend className="text-base font-semibold text-slate-900">Images</legend>
              {form.images.length < 5 && (
                <button type="button" onClick={addImage} className="flex items-center gap-1.5 text-xs font-medium text-yellow-600 hover:text-yellow-700">
                  <Plus className="w-3.5 h-3.5" /> Add image
                </button>
              )}
            </div>
            <div className="space-y-3">
              {form.images.map((img, idx) => (
                <div key={idx} className="flex gap-2">
                  <div className="relative flex-1">
                    <ImagePlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="url"
                      value={img}
                      onChange={(e) => handleImageChange(idx, e.target.value)}
                      placeholder={idx === 0 ? "Primary image URL (required)" : "Additional image URL"}
                      className={`w-full h-10 pl-9 pr-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50 ${idx === 0 && errors.image0 ? "border-red-400" : "border-slate-200"}`}
                    />
                  </div>
                  {form.images.length > 1 && (
                    <button type="button" onClick={() => removeImage(idx)} className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              {errors.image0 && <p className="text-xs text-red-500">{errors.image0}</p>}
              <p className="text-xs text-slate-400">Use direct image URLs from Cloudinary, Imgur, or any CDN.</p>
            </div>
          </fieldset>

          {/* ── Features + Map ────────────────────────────────────────────── */}
          <fieldset className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <legend className="text-base font-semibold text-slate-900 mb-4">Features & Location</legend>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">Features & Amenities</label>
                <input
                  type="text"
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Pool, Smart Home, Gym, Garden, Solar Panels…"
                  className={inputClass()}
                />
                <p className="mt-1 text-xs text-slate-400">Separate with commas.</p>
              </div>
            </div>
          </fieldset>

          {/* ── Visibility ───────────────────────────────────────────────── */}
          <fieldset className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <legend className="text-base font-semibold text-slate-900 mb-4">Visibility</legend>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) => set("isFeatured", e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-yellow-500 focus:ring-yellow-400/50"
              />
              <span className="text-sm font-medium text-slate-700">Mark as Featured</span>
              <span className="text-xs text-slate-400">(appears in homepage carousel and city pages)</span>
            </label>
          </fieldset>

          {/* ── Actions ──────────────────────────────────────────────────── */}
          <div className="flex items-center gap-3 pb-8">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-yellow-500 text-slate-900 font-semibold text-sm hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Property"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminPropertyForm;
