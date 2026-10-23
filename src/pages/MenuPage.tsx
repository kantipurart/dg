import React, { useState, useMemo } from 'react';
import { Search, Phone, Plus, Minus, Trash2, Wine } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { MENU_CATEGORIES, MENU_ITEMS, MenuCategoryId, MenuItem } from '../data/menuData';
import {
  filterMenuItems,
  calculateShortlistSummary,
  ShortlistEntry,
} from '../utils/menuLogic';
import { PageId } from '../components/Navbar';

interface MenuPageProps {
  shortlist: ShortlistEntry[];
  onAddItem: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onClearShortlist: () => void;
  onNavigate: (page: PageId) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  shortlist,
  onAddItem,
  onUpdateQuantity,
  onClearShortlist,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [showAlcohol, setShowAlcohol] = useState(false);

  const visibleCategories = useMemo(() => {
    return MENU_CATEGORIES.filter((cat) => (showAlcohol ? true : !cat.isAlcoholic));
  }, [showAlcohol]);

  const filteredItems = useMemo(() => {
    return filterMenuItems(MENU_ITEMS, {
      categoryId: selectedCategory,
      searchQuery,
      dietaryFilter,
      showAlcohol,
    });
  }, [selectedCategory, searchQuery, dietaryFilter, showAlcohol]);

  const shortlistSummary = useMemo(() => calculateShortlistSummary(shortlist), [shortlist]);

  const handleToggleAlcohol = () => {
    setShowAlcohol((prev) => {
      const next = !prev;
      if (!next && selectedCategory === 'cocktails-bar') {
        setSelectedCategory('all');
      }
      return next;
    });
  };

  return (
    <div className="bg-[#0D110E] pt-20 text-[#F4F7F4]">
      <section className="border-b border-[#243028] bg-[#111713] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
                Our <span className="text-[#44B649]">Menu</span>
              </h1>
              <div className="mt-3 h-1 w-12 bg-[#44B649]" aria-hidden="true" />
            </div>
            <a
              href={BUSINESS_CONFIG.contact.telHref}
              className="inline-flex items-center gap-2 rounded-full bg-[#44B649] px-6 py-3 font-mono-num text-xs font-bold tracking-wider text-white uppercase hover:bg-[#3CA341] whitespace-nowrap shrink-0 self-start sm:self-auto"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>Call {BUSINESS_CONFIG.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-[#243028] bg-[#131915] py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1 max-w-md">
              <label htmlFor="menu-search-input" className="sr-only">
                Search dishes
              </label>
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#44B649]"
                aria-hidden="true"
              />
              <input
                id="menu-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Momo, Chowmein, Sekuwa, Khana, Pizza..."
                className="w-full rounded-full border border-[#2B382F] bg-[#0D110E] py-2.5 pr-4 pl-10 text-sm text-white placeholder-[#7A857E] focus:border-[#44B649] focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div
                role="group"
                aria-label="Filter menu by dietary preference"
                className="inline-flex rounded-full border border-[#2B382F] bg-[#0D110E] p-1"
              >
                {(
                  [
                    ['all', 'All'],
                    ['veg', 'Veg'],
                    ['non-veg', 'Non-Veg'],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setDietaryFilter(key)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                      dietaryFilter === key
                        ? 'bg-[#44B649] text-white'
                        : 'text-[#B4BCB6] hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleToggleAlcohol}
                aria-pressed={showAlcohol}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                  showAlcohol
                    ? 'border-[#44B649] bg-[#44B649] text-white'
                    : 'border-[#2B382F] bg-[#0D110E] text-[#B4BCB6] hover:border-[#44B649] hover:text-white'
                }`}
              >
                <Wine className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{showAlcohol ? 'Hide Cocktails' : 'Cocktails (18+)'}</span>
              </button>
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Menu Categories"
            className="mt-4 flex flex-wrap items-center gap-2"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'all'}
              onClick={() => setSelectedCategory('all')}
              className={`rounded-full border px-4 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === 'all'
                  ? 'border-[#44B649] bg-[#44B649] text-white'
                  : 'border-[#2B382F] bg-[#0D110E] text-[#C8D0CA] hover:border-[#44B649]'
              }`}
            >
              All
            </button>
            {visibleCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full border px-4 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'border-[#44B649] bg-[#44B649] text-white'
                    : 'border-[#2B382F] bg-[#0D110E] text-[#C8D0CA] hover:border-[#44B649]'
                }`}
              >
                {cat.shortTitle}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0D110E] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              {filteredItems.length === 0 ? (
                <div className="border border-[#243028] bg-[#131915] p-8 text-center">
                  <p className="font-display text-2xl font-bold text-white">
                    No dishes found.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setDietaryFilter('all');
                    }}
                    className="mt-4 rounded-full bg-[#44B649] px-5 py-2 text-xs font-bold text-white uppercase"
                  >
                    Show All
                  </button>
                </div>
              ) : (
                <div className="space-y-10">
                  {visibleCategories.map((category) => {
                    const categoryItems = filteredItems.filter(
                      (item) => item.categoryId === category.id
                    );
                    if (categoryItems.length === 0) return null;

                    return (
                      <div key={category.id} id={`cat-${category.id}`}>
                        <div className="border-b border-[#243028] pb-2.5">
                          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                            {category.title}
                          </h2>
                        </div>

                        <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {categoryItems.map((item) => {
                            const inShortlist = shortlist.find((s) => s.item.id === item.id);
                            return (
                              <div
                                key={item.id}
                                className="flex items-center justify-between gap-3 border border-[#243028] bg-[#131915] px-4 py-3.5 transition-colors hover:border-[#44B649]/50"
                              >
                                <div className="min-w-0 flex-1">
                                  <h3 className="font-display text-lg font-bold text-white">
                                    {item.name}
                                  </h3>
                                  <p className="mt-0.5 truncate text-xs text-[#9BA39E]">
                                    {item.description}
                                  </p>
                                </div>

                                <div className="flex items-center gap-2.5 shrink-0">
                                  <span className="font-mono-num text-xs font-bold text-[#44B649]">
                                    {item.priceDisplay}
                                  </span>

                                  {inShortlist ? (
                                    <div className="inline-flex items-center rounded-full border border-[#44B649] bg-[#0D110E]">
                                      <button
                                        type="button"
                                        aria-label={`Decrease quantity of ${item.name}`}
                                        onClick={() => onUpdateQuantity(item.id, -1)}
                                        className="px-2 py-1 text-xs text-white hover:text-[#44B649]"
                                      >
                                        <Minus className="h-3 w-3" />
                                      </button>
                                      <span className="font-mono-num px-2 text-xs font-bold text-white">
                                        {inShortlist.quantity}
                                      </span>
                                      <button
                                        type="button"
                                        aria-label={`Increase quantity of ${item.name}`}
                                        onClick={() => onUpdateQuantity(item.id, 1)}
                                        className="px-2 py-1 text-xs text-white hover:text-[#44B649]"
                                      >
                                        <Plus className="h-3 w-3" />
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => onAddItem(item)}
                                      className="inline-flex items-center gap-1 rounded-full border border-[#2B382F] bg-[#18201B] px-3 py-1 text-xs font-bold text-[#E6ECE8] hover:border-[#44B649] hover:text-[#44B649]"
                                    >
                                      <Plus className="h-3 w-3" aria-hidden="true" />
                                      <span>Add</span>
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <aside className="lg:col-span-4">
              <div className="sticky top-24 border border-[#243028] bg-[#131915] p-5">
                <h2 className="font-display text-2xl font-bold text-white">
                  Selected Dishes
                </h2>

                {shortlist.length === 0 ? (
                  <p className="my-5 border border-dashed border-[#2B382F] bg-[#0D110E] p-4 text-center text-xs text-[#9BA39E]">
                    Tap &ldquo;+ Add&rdquo; on any dish to calculate your total.
                  </p>
                ) : (
                  <div className="my-4 space-y-2.5 border-y border-[#243028] py-3">
                    {shortlist.map(({ item, quantity }) => (
                      <div key={item.id} className="flex items-center justify-between gap-2 text-xs">
                        <div>
                          <span className="font-semibold text-white">
                            {quantity}× {item.name}
                          </span>
                          <span className="ml-2 font-mono-num text-[#44B649]">
                            {item.priceDisplay}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            aria-label={`Decrease ${item.name}`}
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="border border-[#2B382F] p-1 text-white hover:border-[#44B649]"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            aria-label={`Increase ${item.name}`}
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="border border-[#2B382F] p-1 text-white hover:border-[#44B649]"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-baseline justify-between border-t border-[#243028] pt-2.5 text-sm font-bold text-white">
                      <span>Total ({shortlistSummary.totalItems} items)</span>
                      <span className="font-mono-num text-[#44B649]">
                        NPR {shortlistSummary.knownTotalNpr.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-2.5">
                  <a
                    href={BUSINESS_CONFIG.contact.telHref}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#44B649] px-4 py-3 font-mono-num text-xs font-bold text-white uppercase hover:bg-[#3CA341]"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    <span>Call {BUSINESS_CONFIG.contact.phoneDisplay}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex w-full items-center justify-center rounded-full border border-[#44B649] bg-[#0D110E] px-4 py-2.5 text-xs font-bold text-white uppercase hover:bg-[#18201B]"
                  >
                    Book Table with Order
                  </button>
                  {shortlist.length > 0 && (
                    <button
                      type="button"
                      onClick={onClearShortlist}
                      className="flex w-full items-center justify-center gap-1 pt-1 text-xs text-[#9BA39E] hover:text-white hover:underline"
                    >
                      <Trash2 className="h-3 w-3" aria-hidden="true" />
                      <span>Clear List</span>
                    </button>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};
