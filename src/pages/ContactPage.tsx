import React, { useState } from 'react';
import { Phone, MapPin, ExternalLink, CheckCircle2, Copy, Check, Trash2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import {
  ReservationFormInput,
  ShortlistEntry,
  validateReservationInput,
  calculateShortlistSummary,
} from '../utils/menuLogic';

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

export const ContactPage: React.FC<ContactPageProps> = ({
  shortlist,
  savedInquiries,
  onSaveInquiry,
  onClearInquiries,
}) => {
  const [formData, setFormData] = useState<ReservationFormInput>({
    fullName: '',
    phone: '',
    visitDate: '',
    visitTime: '18:00',
    partySize: '4',
    seatingPreference: 'Outdoor Garden Lawn Table',
    occasionType: 'Family Lunch / Khaja Outing',
    notes: '',
  });

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
    return `Dream Garden Resort Booking (${inq.id})
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
      <section className="border-b border-[#243028] bg-[#111713] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
            Location & <span className="text-[#44B649]">Table Booking</span>
          </h1>
          <div className="mt-3 h-1 w-12 bg-[#44B649]" aria-hidden="true" />
        </div>
      </section>

      <section className="bg-[#0D110E] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-5">
              <div className="border border-[#243028] bg-[#131915] p-6">
                <h2 className="font-display text-2xl font-bold text-white">
                  {BUSINESS_CONFIG.englishName}
                </h2>

                <div className="mt-4 space-y-3 text-sm text-[#C8D0CA]">
                  <p>
                    <strong className="text-white">Location:</strong> {BUSINESS_CONFIG.location.fullAddress}
                  </p>
                  <p>
                    <strong className="text-white">Phone:</strong>{' '}
                    <a
                      href={BUSINESS_CONFIG.contact.telHref}
                      className="font-mono-num text-base font-bold text-[#44B649] underline"
                    >
                      {BUSINESS_CONFIG.contact.phoneDisplay}
                    </a>{' '}
                    / {BUSINESS_CONFIG.contact.landlineDisplay}
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

            <div className="lg:col-span-7">
              <div className="border border-[#243028] bg-[#131915] p-6 sm:p-8">
                <h2 className="font-display text-3xl font-bold text-white">
                  Book a <span className="text-[#44B649]">Table</span>
                </h2>
                <p className="mt-1 text-xs text-[#9BA39E]">
                  Fill in your details below or call{' '}
                  <strong className="font-mono-num text-[#44B649]">
                    {BUSINESS_CONFIG.contact.phoneDisplay}
                  </strong>{' '}
                  directly.
                </p>

                {shortlist.length > 0 && (
                  <div className="mt-4 border border-[#44B649]/50 bg-[#0D110E] p-3.5 text-xs text-[#E6ECE8]">
                    <strong className="text-[#44B649]">
                      Selected Dishes ({shortlistSummary.totalItems} items · NPR{' '}
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
                        Full Name *
                      </label>
                      <input
                        id="inquiry-fullName"
                        name="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Your name"
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
                        Phone Number *
                      </label>
                      <input
                        id="inquiry-phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="98XXXXXXXX"
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

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="inquiry-visitDate"
                        className="block text-xs font-bold text-[#C8D0CA] uppercase"
                      >
                        Date *
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
                        Time
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
                        Guests *
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
                          Outdoor Garden Lawn Table
                        </option>
                        <option value="Private Garden Gazebo Hut">
                          Private Garden Gazebo Hut
                        </option>
                        <option value="Indoor Family Hall">
                          Indoor Family Hall
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
                      Note (Optional)
                    </label>
                    <input
                      id="inquiry-notes"
                      name="notes"
                      type="text"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Any special request..."
                      className="mt-1 w-full border border-[#2B382F] bg-[#0D110E] px-3.5 py-2.5 text-sm text-white placeholder-[#68756D] focus:border-[#44B649] focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full rounded-full bg-[#44B649] px-7 py-3.5 text-xs font-bold tracking-wider text-white uppercase hover:bg-[#3CA341] sm:w-auto"
                    >
                      Confirm Booking Details
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
                          Booking Summary ({latestSubmission.id})
                        </h3>
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
                                <span>Copy</span>
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
                        Saved ({savedInquiries.length})
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
