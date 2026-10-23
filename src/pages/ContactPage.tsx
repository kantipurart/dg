import React, { useState } from 'react';
import { Phone, MapPin, ExternalLink, CheckCircle2, Copy, Check, Trash2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import {
  ReservationFormInput,
  ShortlistEntry,
  validateReservationInput,
  calculateShortlistSummary,
} from '../utils/menuLogic';
import { DreamGardenWordmark } from '../components/DreamGardenLogo';

export interface SavedInquiry extends ReservationFormInput {
  id: string;
  createdAt: string;
  attachedDishes: { name: string; quantity: number; priceDisplay: string }[];
}

interface ContactPageProps {
  shortlist: ShortlistEntry[];
  preselectedPackage: string | null;
  savedInquiries: SavedInquiry[];
  onSaveInquiry: (inquiry: SavedInquiry) => void;
  onClearInquiries: () => void;
}

function getIsoDateOffset(daysAhead: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
}

function getUpcomingSaturdayIso(): string {
  const d = new Date();
  const day = d.getDay();
  const diff = (6 - day + 7) % 7 || 7;
  d.setDate(d.getDate() + diff);
  return d.toISOString().split('T')[0];
}

export const ContactPage: React.FC<ContactPageProps> = ({
  shortlist,
  savedInquiries,
  onSaveInquiry,
  onClearInquiries,
}) => {
  const [formData, setFormData] = useState<ReservationFormInput>(() => ({
    fullName: '',
    phone: '',
    visitDate: getIsoDateOffset(0),
    visitTime: '18:00',
    partySize: '4',
    seatingPreference: 'Outdoor Garden Lawn Table',
    occasionType: 'Family Lunch / Khaja Outing',
    notes: '',
  }));

  const [errors, setErrors] = useState<Partial<Record<keyof ReservationFormInput, string>>>({});
  const [latestSubmission, setLatestSubmission] = useState<SavedInquiry | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const shortlistSummary = calculateShortlistSummary(shortlist);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ReservationFormInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const setQuickDate = (isoDate: string) => {
    setFormData((prev) => ({ ...prev, visitDate: isoDate }));
    if (errors.visitDate) {
      setErrors((prev) => ({ ...prev, visitDate: undefined }));
    }
  };

  const setQuickPartySize = (size: string, seating?: string) => {
    setFormData((prev) => ({
      ...prev,
      partySize: size,
      seatingPreference: seating || prev.seatingPreference,
    }));
    if (errors.partySize) {
      setErrors((prev) => ({ ...prev, partySize: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateReservationInput(formData);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    const newInquiry: SavedInquiry = {
      ...formData,
      id: `DGR-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toLocaleString(),
      attachedDishes: shortlist.map((s) => ({
        name: s.item.name,
        quantity: s.quantity,
        priceDisplay: s.item.priceDisplay,
      })),
    };

    onSaveInquiry(newInquiry);
    setLatestSubmission(newInquiry);
    setErrors({});
  };

  const formatInquiryText = (inq: SavedInquiry) => {
    const dishLines =
      inq.attachedDishes.length > 0
        ? `\nDishes:\n${inq.attachedDishes
            .map((d) => `- ${d.quantity}x ${d.name} (${d.priceDisplay})`)
            .join('\n')}`
        : '';
    return `Dream Garden Resort Bhangal Booking (${inq.id})
Name: ${inq.fullName}
Phone: ${inq.phone}
Date: ${inq.visitDate} at ${inq.visitTime}
Guests: ${inq.partySize}
Seating: ${inq.seatingPreference}
Occasion: ${inq.occasionType}${inq.notes ? `\nNote: ${inq.notes}` : ''}${dishLines}`;
  };

  const handleCopySummary = async (inq: SavedInquiry) => {
    try {
      await navigator.clipboard.writeText(formatInquiryText(inq));
      setCopiedId(inq.id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="bg-[#0D110E] pt-20 text-[#F4F7F4]">
      {/* Compact Header */}
      <section className="border-b border-[#243028] bg-[#111713] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-[0.2em] text-[#44B649] uppercase">
            <span>Chapali Bhangal, Budhanilkantha</span>
            <span aria-hidden="true"> · </span>
            <span lang="ne">{BUSINESS_CONFIG.nepaliAreaName}</span>
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
            <DreamGardenWordmark className="text-3xl sm:text-5xl" />
            <span className="text-white"> · नक्सा र टेबल बुकिङ</span>
          </h1>
          <div className="mt-3 h-1 w-12 bg-[#44B649]" aria-hidden="true" />
        </div>
      </section>

      {/* Main Grid */}
      <section className="bg-[#0D110E] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left Column: Map & Phone */}
            <div className="space-y-6 lg:col-span-5">
              <div className="border border-[#243028] bg-[#131915] p-6">
                <h2 className="font-display text-2xl font-bold text-white">
                  <DreamGardenWordmark showResort className="text-2xl" /> ·{' '}
                  <span className="text-[#44B649]" lang="ne">
                    {BUSINESS_CONFIG.nepaliName}
                  </span>
                </h2>
                <p className="mt-1 text-xs font-medium text-[#B4BCB6]" lang="ne">
                  {BUSINESS_CONFIG.nepaliAreaName}
                </p>

                <div className="mt-5 space-y-3 text-sm text-[#C8D0CA]">
                  <p>
                    <strong className="text-white">Location:</strong> {BUSINESS_CONFIG.location.fullAddress}
                  </p>
                  <p>
                    <strong className="text-white">Google Plus Code:</strong> {BUSINESS_CONFIG.location.plusCode}
                  </p>
                  <p>
                    <strong className="text-white">Phone:</strong>{' '}
                    <a
                      href={BUSINESS_CONFIG.contact.telHref}
                      className="font-mono-num text-base font-bold text-[#44B649] underline"
                    >
                      {BUSINESS_CONFIG.contact.phoneDisplay}
                    </a>{' '}
                    /{' '}
                    <a
                      href={BUSINESS_CONFIG.contact.landlineHref}
                      className="font-mono-num font-semibold text-[#D2DAD4] hover:text-white"
                    >
                      {BUSINESS_CONFIG.contact.landlineDisplay}
                    </a>
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2.5 border-t border-[#243028] pt-5">
                  <a
                    href={BUSINESS_CONFIG.contact.telHref}
                    className="inline-flex items-center gap-2 rounded-full bg-[#44B649] px-5 py-2.5 font-mono-num text-xs font-bold text-white uppercase hover:bg-[#3CA341]"
                  >
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Call {BUSINESS_CONFIG.contact.phoneDisplay}</span>
                  </a>
                  <a
                    href={BUSINESS_CONFIG.location.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#44B649] px-4 py-2.5 text-xs font-bold text-white uppercase hover:bg-[#18201B]"
                  >
                    <MapPin className="h-3.5 w-3.5 text-[#44B649]" aria-hidden="true" />
                    <span>Google Maps</span>
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="overflow-hidden border border-[#243028] bg-[#131915]">
                <iframe
                  title="Google Map of Dream Garden Resort in Chapali Bhangal, Budhanilkantha"
                  src="https://www.google.com/maps?q=Dream+Garden+Resort+Budhanilkantha+Kathmandu+Nepal&output=embed"
                  className="h-80 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right Column: Quick Table Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="border border-[#243028] bg-[#131915] p-6 sm:p-8">
                <h2 className="font-display text-3xl font-bold text-white">
                  गार्डेन टेबल र पारिवारिक बुकिङ · <span className="text-[#44B649]">Table Inquiry</span>
                </h2>
                <p className="mt-1 text-xs text-[#9BA39E]">
                  Fill in your details below and call{' '}
                  <strong className="font-mono-num text-[#44B649]">
                    {BUSINESS_CONFIG.contact.phoneDisplay}
                  </strong>{' '}
                  to confirm your garden table or group gathering.
                </p>

                {shortlist.length > 0 && (
                  <div className="mt-4 border border-[#44B649]/50 bg-[#0D110E] p-3.5 text-xs text-[#E6ECE8]">
                    <strong className="text-[#44B649]">
                      Attached Dishes ({shortlistSummary.totalItems} items · NPR{' '}
                      {shortlistSummary.knownTotalNpr.toLocaleString()}):
                    </strong>{' '}
                    {shortlist.map((s) => `${s.quantity}× ${s.item.name}`).join(' · ')}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="inquiry-fullName"
                        className="block text-xs font-bold text-[#C8D0CA] uppercase"
                      >
                        Your Full Name (नाम) *
                      </label>
                      <input
                        id="inquiry-fullName"
                        name="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g., Sita Gurung"
                        aria-invalid={Boolean(errors.fullName)}
                        className="mt-1 w-full border border-[#2B382F] bg-[#0D110E] px-3.5 py-2.5 text-sm text-white placeholder-[#68756D] focus:border-[#44B649] focus:outline-none"
                      />
                      {errors.fullName && (
                        <p role="alert" className="mt-1 text-xs font-medium text-[#F87171]">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-phone"
                        className="block text-xs font-bold text-[#C8D0CA] uppercase"
                      >
                        Phone Number (फोन नं.) *
                      </label>
                      <input
                        id="inquiry-phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="9841XXXXXX"
                        aria-invalid={Boolean(errors.phone)}
                        className="mt-1 w-full border border-[#2B382F] bg-[#0D110E] px-3.5 py-2.5 text-sm text-white placeholder-[#68756D] focus:border-[#44B649] focus:outline-none"
                      />
                      {errors.phone && (
                        <p role="alert" className="mt-1 text-xs font-medium text-[#F87171]">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quick Presets for Typical Users */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-y border-[#243028] py-3 text-xs">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-semibold text-[#9BA39E]">Quick Date:</span>
                      {[
                        { label: 'Today (आज)', val: getIsoDateOffset(0) },
                        { label: 'Tomorrow (भोलि)', val: getIsoDateOffset(1) },
                        { label: 'This Saturday (शनिबार)', val: getUpcomingSaturdayIso() },
                      ].map((d) => (
                        <button
                          key={d.label}
                          type="button"
                          onClick={() => setQuickDate(d.val)}
                          className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                            formData.visitDate === d.val
                              ? 'border-[#44B649] bg-[#44B649] text-white'
                              : 'border-[#2B382F] bg-[#0D110E] text-[#C8D0CA] hover:border-[#44B649]'
                          }`}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-semibold text-[#9BA39E]">Guests:</span>
                      {[
                        { label: '2', size: '2', seat: 'Outdoor Garden Lawn Table' },
                        { label: '4 Family', size: '4', seat: 'Outdoor Garden Lawn Table' },
                        { label: '8 Hut', size: '8', seat: 'Private Garden Gazebo Hut' },
                        { label: '15+ Group', size: '15', seat: 'Private Garden Gazebo Hut' },
                      ].map((g) => (
                        <button
                          key={g.label}
                          type="button"
                          onClick={() => setQuickPartySize(g.size, g.seat)}
                          className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                            formData.partySize === g.size
                              ? 'border-[#44B649] bg-[#44B649] text-white'
                              : 'border-[#2B382F] bg-[#0D110E] text-[#C8D0CA] hover:border-[#44B649]'
                          }`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="inquiry-visitDate"
                        className="block text-xs font-bold text-[#C8D0CA] uppercase"
                      >
                        Preferred Date (मिति) *
                      </label>
                      <input
                        id="inquiry-visitDate"
                        name="visitDate"
                        type="date"
                        required
                        value={formData.visitDate}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.visitDate)}
                        className="mt-1 w-full border border-[#2B382F] bg-[#0D110E] px-3.5 py-2.5 text-sm text-white focus:border-[#44B649] focus:outline-none"
                      />
                      {errors.visitDate && (
                        <p role="alert" className="mt-1 text-xs font-medium text-[#F87171]">
                          {errors.visitDate}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-visitTime"
                        className="block text-xs font-bold text-[#C8D0CA] uppercase"
                      >
                        Time (समय)
                      </label>
                      <input
                        id="inquiry-visitTime"
                        name="visitTime"
                        type="time"
                        value={formData.visitTime}
                        onChange={handleChange}
                        className="mt-1 w-full border border-[#2B382F] bg-[#0D110E] px-3.5 py-2.5 text-sm text-white focus:border-[#44B649] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-partySize"
                        className="block text-xs font-bold text-[#C8D0CA] uppercase"
                      >
                        Party Size (जना) *
                      </label>
                      <input
                        id="inquiry-partySize"
                        name="partySize"
                        type="number"
                        min="1"
                        max="200"
                        required
                        value={formData.partySize}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.partySize)}
                        className="mt-1 w-full border border-[#2B382F] bg-[#0D110E] px-3.5 py-2.5 text-sm text-white focus:border-[#44B649] focus:outline-none"
                      />
                      {errors.partySize && (
                        <p role="alert" className="mt-1 text-xs font-medium text-[#F87171]">
                          {errors.partySize}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="inquiry-seatingPreference"
                        className="block text-xs font-bold text-[#C8D0CA] uppercase"
                      >
                        Seating Area
                      </label>
                      <select
                        id="inquiry-seatingPreference"
                        name="seatingPreference"
                        value={formData.seatingPreference}
                        onChange={handleChange}
                        className="mt-1 w-full border border-[#2B382F] bg-[#0D110E] px-3.5 py-2.5 text-sm text-white focus:border-[#44B649] focus:outline-none"
                      >
                        <option value="Outdoor Garden Lawn Table">
                          Outdoor Garden Lawn Table (बगैंचा टेबल)
                        </option>
                        <option value="Private Garden Gazebo Hut">
                          Private Garden Gazebo Hut (प्राइभेट हट)
                        </option>
                        <option value="Indoor Family Hall">
                          Indoor Family Hall (इन्डोर हल)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-occasionType"
                        className="block text-xs font-bold text-[#C8D0CA] uppercase"
                      >
                        Occasion
                      </label>
                      <select
                        id="inquiry-occasionType"
                        name="occasionType"
                        value={formData.occasionType}
                        onChange={handleChange}
                        className="mt-1 w-full border border-[#2B382F] bg-[#0D110E] px-3.5 py-2.5 text-sm text-white focus:border-[#44B649] focus:outline-none"
                      >
                        <option value="Family Lunch / Khaja Outing">
                          Family Lunch / Khaja Outing
                        </option>
                        <option value="Friends Group Dinner">Friends Group Dinner</option>
                        <option value="Birthday / Family Celebration">
                          Birthday / Family Celebration
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-notes"
                      className="block text-xs font-bold text-[#C8D0CA] uppercase"
                    >
                      Special Note (Optional)
                    </label>
                    <input
                      id="inquiry-notes"
                      name="notes"
                      type="text"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="e.g., Mustang Momo platter, Sekuwa, or arrival time..."
                      className="mt-1 w-full border border-[#2B382F] bg-[#0D110E] px-3.5 py-2.5 text-sm text-white placeholder-[#68756D] focus:border-[#44B649] focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full rounded-full bg-[#44B649] px-7 py-3.5 text-xs font-bold tracking-wider text-white uppercase hover:bg-[#3CA341] sm:w-auto"
                    >
                      Generate Booking Summary
                    </button>
                  </div>
                </form>

                {latestSubmission && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="mt-6 border border-[#44B649] bg-[#0D110E] p-5"
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-[#44B649]"
                        aria-hidden="true"
                      />
                      <div className="flex-1">
                        <h3 className="font-display text-2xl font-bold text-white">
                          Booking Summary Ready ({latestSubmission.id})
                        </h3>
                        <p className="mt-0.5 text-xs text-[#C8D0CA]">
                          Call{' '}
                          <a
                            href={BUSINESS_CONFIG.contact.telHref}
                            className="font-mono-num font-bold text-[#44B649] underline"
                          >
                            {BUSINESS_CONFIG.contact.phoneDisplay}
                          </a>{' '}
                          with this summary to confirm your table:
                        </p>

                        <pre className="mt-3 overflow-x-auto border border-[#243028] bg-[#131915] p-3 font-mono-num text-xs text-[#E6ECE8]">
                          {formatInquiryText(latestSubmission)}
                        </pre>

                        <div className="mt-3 flex flex-wrap items-center gap-2.5">
                          <a
                            href={BUSINESS_CONFIG.contact.telHref}
                            className="inline-flex items-center gap-1.5 rounded-full bg-[#44B649] px-4 py-2 font-mono-num text-xs font-bold text-white uppercase hover:bg-[#3CA341]"
                          >
                            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Call {BUSINESS_CONFIG.contact.phoneDisplay}</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => handleCopySummary(latestSubmission)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-[#44B649] bg-[#131915] px-4 py-2 text-xs font-bold text-white uppercase hover:bg-[#18201B]"
                          >
                            {copiedId === latestSubmission.id ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-[#44B649]" aria-hidden="true" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                                <span>Copy Summary</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {savedInquiries.length > 0 && (
                  <div className="mt-6 border-t border-[#243028] pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">
                        Saved Inquiries ({savedInquiries.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          onClearInquiries();
                          setLatestSubmission(null);
                        }}
                        className="inline-flex items-center gap-1 text-xs text-[#9BA39E] hover:text-white hover:underline"
                      >
                        <Trash2 className="h-3 w-3" aria-hidden="true" />
                        <span>Clear</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
