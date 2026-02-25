import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GuestManager } from '../components/GuestManager';
import {
  budgetService,
  checklistService,
  faqService,
  galleryService,
  registryService,
  timelineService,
  weddingService,
} from '../services/api';
import {
  BudgetItem,
  Checklist,
  FaqItem,
  GalleryItem,
  GuestStats,
  RegistryItem,
  Timeline,
  Wedding,
} from '../types';

type TabId = 'overview' | 'guests' | 'checklist' | 'timeline' | 'budget' | 'gallery' | 'qna' | 'shop';

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'guests', label: 'Guests & RSVP' },
  { id: 'checklist', label: 'Checklist' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'budget', label: 'Budget' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'qna', label: 'FAQ' },
  { id: 'shop', label: 'Registry' },
];

const defaultGuestStats: GuestStats = {
  totalGuests: 0,
  confirmedCount: 0,
  declinedCount: 0,
  pendingCount: 0,
};

const Panel: React.FC<{ title: string; subtitle?: string; children: React.ReactNode }> = ({ title, subtitle, children }) => (
  <section className="card-surface p-5 sm:p-6">
    <div className="mb-4">
      <h2 className="text-3xl font-semibold text-stone-900">{title}</h2>
      {subtitle && <p className="text-sm text-stone-600">{subtitle}</p>}
    </div>
    {children}
  </section>
);

const EmptyState: React.FC<{ text: string }> = ({ text }) => (
  <div className="rounded-xl border border-dashed border-stone-300 bg-white/60 p-4 text-sm text-stone-600">{text}</div>
);

export const WeddingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [wedding, setWedding] = useState<Wedding | null>(null);
  const [stats, setStats] = useState<GuestStats>(defaultGuestStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [checklist, setChecklist] = useState<Checklist[]>([]);
  const [timeline, setTimeline] = useState<Timeline[]>([]);
  const [budget, setBudget] = useState<BudgetItem[]>([]);
  const [faq, setFaq] = useState<FaqItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [registry, setRegistry] = useState<RegistryItem[]>([]);

  const weddingId = id ? Number.parseInt(id, 10) : 0;

  const [checklistDraft, setChecklistDraft] = useState({ itemName: '', category: '', priority: 'medium' });
  const [timelineDraft, setTimelineDraft] = useState({ title: '', startTime: '', location: '', category: 'event' });
  const [budgetDraft, setBudgetDraft] = useState({ category: '', description: '', budgetedAmount: '', actualAmount: '' });
  const [faqDraft, setFaqDraft] = useState({ question: '', answer: '', category: '' });
  const [galleryDraft, setGalleryDraft] = useState({ imageUrl: '', caption: '', category: '' });
  const [registryDraft, setRegistryDraft] = useState({ notes: '', giftUrl: '', quantityNeeded: '1' });

  const loadAll = async () => {
    if (!weddingId) return;
    setLoading(true);
    setError('');
    try {
      const [weddingResp, statsResp, checklistResp, timelineResp, budgetResp, faqResp, galleryResp, registryResp] =
        await Promise.all([
          weddingService.getById(weddingId),
          weddingService.getStats(weddingId),
          checklistService.getAll(weddingId),
          timelineService.getAll(weddingId),
          budgetService.getAll(weddingId),
          faqService.getAll(weddingId),
          galleryService.getAll(weddingId),
          registryService.getAll(weddingId),
        ]);

      setWedding(weddingResp.wedding || null);
      setStats(statsResp.stats || defaultGuestStats);
      setChecklist(checklistResp.checklist || []);
      setTimeline(timelineResp.timeline || []);
      setBudget(budgetResp.budget || []);
      setFaq(faqResp.faq || []);
      setGallery(galleryResp.gallery || []);
      setRegistry(registryResp.registry || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load wedding details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadAll();
  }, [weddingId]);

  const budgetTotals = useMemo(() => {
    const budgeted = budget.reduce((sum, item) => sum + Number(item.budgetedAmount || 0), 0);
    const actual = budget.reduce((sum, item) => sum + Number(item.actualAmount || 0), 0);
    return { budgeted, actual };
  }, [budget]);

  const requireToken = () => {
    if (!token) {
      setError('Authentication required');
      return false;
    }
    return true;
  };

  const addChecklistItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requireToken()) return;
    await checklistService.create(weddingId, checklistDraft, token!);
    setChecklistDraft({ itemName: '', category: '', priority: 'medium' });
    const data = await checklistService.getAll(weddingId);
    setChecklist(data.checklist || []);
  };

  const toggleChecklistItem = async (item: Checklist) => {
    if (!requireToken()) return;
    await checklistService.update(weddingId, item.id, { isCompleted: !item.isCompleted }, token!);
    const data = await checklistService.getAll(weddingId);
    setChecklist(data.checklist || []);
  };

  const deleteChecklistItem = async (itemId: number) => {
    if (!requireToken()) return;
    await checklistService.delete(weddingId, itemId, token!);
    const data = await checklistService.getAll(weddingId);
    setChecklist(data.checklist || []);
  };

  const addTimelineItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requireToken()) return;
    await timelineService.create(weddingId, timelineDraft, token!);
    setTimelineDraft({ title: '', startTime: '', location: '', category: 'event' });
    const data = await timelineService.getAll(weddingId);
    setTimeline(data.timeline || []);
  };

  const deleteTimelineItem = async (itemId: number) => {
    if (!requireToken()) return;
    await timelineService.delete(weddingId, itemId, token!);
    const data = await timelineService.getAll(weddingId);
    setTimeline(data.timeline || []);
  };

  const addBudgetItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requireToken()) return;
    await budgetService.create(
      weddingId,
      {
        ...budgetDraft,
        budgetedAmount: Number(budgetDraft.budgetedAmount || 0),
        actualAmount: Number(budgetDraft.actualAmount || 0),
      },
      token!
    );
    setBudgetDraft({ category: '', description: '', budgetedAmount: '', actualAmount: '' });
    const data = await budgetService.getAll(weddingId);
    setBudget(data.budget || []);
  };

  const deleteBudgetItem = async (itemId: number) => {
    if (!requireToken()) return;
    await budgetService.delete(weddingId, itemId, token!);
    const data = await budgetService.getAll(weddingId);
    setBudget(data.budget || []);
  };

  const addFaqItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requireToken()) return;
    await faqService.create(weddingId, faqDraft, token!);
    setFaqDraft({ question: '', answer: '', category: '' });
    const data = await faqService.getAll(weddingId);
    setFaq(data.faq || []);
  };

  const deleteFaqItem = async (itemId: number) => {
    if (!requireToken()) return;
    await faqService.delete(weddingId, itemId, token!);
    const data = await faqService.getAll(weddingId);
    setFaq(data.faq || []);
  };

  const addGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requireToken()) return;
    await galleryService.create(weddingId, galleryDraft, token!);
    setGalleryDraft({ imageUrl: '', caption: '', category: '' });
    const data = await galleryService.getAll(weddingId);
    setGallery(data.gallery || []);
  };

  const deleteGalleryItem = async (itemId: number) => {
    if (!requireToken()) return;
    await galleryService.delete(weddingId, itemId, token!);
    const data = await galleryService.getAll(weddingId);
    setGallery(data.gallery || []);
  };

  const addRegistryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requireToken()) return;
    await registryService.create(
      weddingId,
      { ...registryDraft, quantityNeeded: Number(registryDraft.quantityNeeded || 1) },
      token!
    );
    setRegistryDraft({ notes: '', giftUrl: '', quantityNeeded: '1' });
    const data = await registryService.getAll(weddingId);
    setRegistry(data.registry || []);
  };

  const deleteRegistryItem = async (itemId: number) => {
    if (!requireToken()) return;
    await registryService.delete(weddingId, itemId, token!);
    const data = await registryService.getAll(weddingId);
    setRegistry(data.registry || []);
  };

  if (loading) {
    return <div className="page-wrap section-gap"><div className="card-surface p-8 text-center text-stone-600">Loading wedding details...</div></div>;
  }

  if (error && !wedding) {
    return <div className="page-wrap section-gap"><div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div></div>;
  }

  return (
    <div className="page-wrap section-gap space-y-6">
      <section className="card-surface-strong px-5 py-6 sm:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Wedding Workspace</p>
            <h1 className="mt-1 text-5xl font-semibold text-stone-900">
              {wedding?.title || 'Wedding Detail'}
            </h1>
            <p className="mt-2 text-sm text-stone-600">
              {wedding?.groomName} & {wedding?.brideName}
              {wedding?.weddingDate ? ` | ${new Date(wedding.weddingDate).toLocaleDateString()}` : ''}
              {wedding?.location ? ` | ${wedding.location}` : ''}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-stone-200/80 bg-white/80 p-3 text-center">
              <p className="text-xs text-stone-500">Guests</p>
              <p className="text-xl font-semibold text-stone-900">{stats.totalGuests}</p>
            </div>
            <div className="rounded-xl border border-stone-200/80 bg-white/80 p-3 text-center">
              <p className="text-xs text-stone-500">Confirmed</p>
              <p className="text-xl font-semibold text-stone-900">{stats.confirmedCount}</p>
            </div>
            <div className="rounded-xl border border-stone-200/80 bg-white/80 p-3 text-center">
              <p className="text-xs text-stone-500">Tasks</p>
              <p className="text-xl font-semibold text-stone-900">{checklist.length}</p>
            </div>
            <div className="rounded-xl border border-stone-200/80 bg-white/80 p-3 text-center">
              <p className="text-xs text-stone-500">FAQ</p>
              <p className="text-xl font-semibold text-stone-900">{faq.length}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-[96px] z-20 overflow-x-auto rounded-2xl border border-stone-200/80 bg-[#f7f3ee]/90 p-2 backdrop-blur">
        <div className="flex w-max min-w-full gap-2">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                activeTab === tab.id
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:bg-white/70 hover:text-stone-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      {activeTab === 'overview' && (
        <Panel title="Wedding Overview" subtitle="Core details and a quick planning snapshot.">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ['Groom', wedding?.groomName || '-'],
              ['Bride', wedding?.brideName || '-'],
              ['Date', wedding?.weddingDate ? new Date(wedding.weddingDate).toLocaleDateString() : '-'],
              ['Location', wedding?.location || '-'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-stone-200/80 bg-white/75 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{label}</p>
                <p className="mt-1 text-lg font-semibold text-stone-900">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-stone-200/80 bg-white/70 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-stone-500">Description</p>
            <p className="mt-1 text-sm leading-6 text-stone-700">
              {wedding?.description || 'Add a wedding description from the dashboard to personalize your site.'}
            </p>
          </div>
        </Panel>
      )}

      {activeTab === 'guests' && (
        <GuestManager weddingId={weddingId} />
      )}

      {activeTab === 'checklist' && (
        <Panel title="Checklist" subtitle="Manage planning tasks and completion progress.">
          <form onSubmit={addChecklistItem} className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-4">
            <input className="field md:col-span-2" placeholder="Task" value={checklistDraft.itemName} onChange={(e) => setChecklistDraft((d) => ({ ...d, itemName: e.target.value }))} required />
            <input className="field" placeholder="Category" value={checklistDraft.category} onChange={(e) => setChecklistDraft((d) => ({ ...d, category: e.target.value }))} />
            <div className="flex gap-2">
              <select className="field" value={checklistDraft.priority} onChange={(e) => setChecklistDraft((d) => ({ ...d, priority: e.target.value }))}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button type="submit" className="btn-primary">Add</button>
            </div>
          </form>
          {checklist.length === 0 ? (
            <EmptyState text="No checklist items yet." />
          ) : (
            <div className="space-y-2">
              {checklist.map((item) => (
                <div key={item.id} className="flex flex-col gap-3 rounded-xl border border-stone-200/80 bg-white/75 p-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <input type="checkbox" checked={Boolean(item.isCompleted)} onChange={() => void toggleChecklistItem(item)} className="mt-1 h-4 w-4" />
                    <div>
                      <p className={`font-medium ${item.isCompleted ? 'text-stone-400 line-through' : 'text-stone-900'}`}>{item.itemName}</p>
                      <p className="text-xs text-stone-500">{item.category || 'General'} | {item.priority || 'medium'}</p>
                    </div>
                  </div>
                  <button type="button" className="btn-secondary" onClick={() => void deleteChecklistItem(item.id)}>Delete</button>
                </div>
              ))}
            </div>
          )}
        </Panel>
      )}

      {activeTab === 'timeline' && (
        <Panel title="Timeline" subtitle="Build a simple event schedule for the day.">
          <form onSubmit={addTimelineItem} className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-5">
            <input className="field md:col-span-2" placeholder="Title" value={timelineDraft.title} onChange={(e) => setTimelineDraft((d) => ({ ...d, title: e.target.value }))} required />
            <input className="field" type="time" value={timelineDraft.startTime} onChange={(e) => setTimelineDraft((d) => ({ ...d, startTime: e.target.value }))} />
            <input className="field" placeholder="Location" value={timelineDraft.location} onChange={(e) => setTimelineDraft((d) => ({ ...d, location: e.target.value }))} />
            <button type="submit" className="btn-primary">Add</button>
          </form>
          {timeline.length === 0 ? (
            <EmptyState text="No timeline items yet." />
          ) : (
            <div className="space-y-3">
              {timeline.map((item) => (
                <div key={item.id} className="rounded-xl border border-stone-200/80 bg-white/75 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-lg font-semibold text-stone-900">{item.title}</p>
                      <p className="text-sm text-stone-600">{item.startTime || '--'}{item.location ? ` | ${item.location}` : ''}</p>
                    </div>
                    <button type="button" className="btn-secondary" onClick={() => void deleteTimelineItem(item.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Panel>
      )}

      {activeTab === 'budget' && (
        <Panel title="Budget" subtitle="Track estimates and current spending.">
          <form onSubmit={addBudgetItem} className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-5">
            <input className="field" placeholder="Category" value={budgetDraft.category} onChange={(e) => setBudgetDraft((d) => ({ ...d, category: e.target.value }))} />
            <input className="field md:col-span-2" placeholder="Description" value={budgetDraft.description} onChange={(e) => setBudgetDraft((d) => ({ ...d, description: e.target.value }))} />
            <input className="field" type="number" step="0.01" placeholder="Budgeted" value={budgetDraft.budgetedAmount} onChange={(e) => setBudgetDraft((d) => ({ ...d, budgetedAmount: e.target.value }))} />
            <input className="field" type="number" step="0.01" placeholder="Actual" value={budgetDraft.actualAmount} onChange={(e) => setBudgetDraft((d) => ({ ...d, actualAmount: e.target.value }))} />
            <button type="submit" className="btn-primary md:col-span-5">Add Budget Item</button>
          </form>
          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-stone-200/80 bg-white/75 p-4">
              <p className="text-xs text-stone-500">Total Budgeted</p>
              <p className="text-2xl font-semibold text-stone-900">${budgetTotals.budgeted.toFixed(2)}</p>
            </div>
            <div className="rounded-xl border border-stone-200/80 bg-white/75 p-4">
              <p className="text-xs text-stone-500">Total Actual</p>
              <p className="text-2xl font-semibold text-stone-900">${budgetTotals.actual.toFixed(2)}</p>
            </div>
          </div>
          {budget.length === 0 ? (
            <EmptyState text="No budget items yet." />
          ) : (
            <div className="space-y-2">
              {budget.map((item) => (
                <div key={item.id} className="flex flex-col gap-2 rounded-xl border border-stone-200/80 bg-white/75 p-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium text-stone-900">{item.category || 'Category'} - {item.description || 'Expense'}</p>
                    <p className="text-sm text-stone-600">${Number(item.actualAmount || 0).toFixed(2)} / ${Number(item.budgetedAmount || 0).toFixed(2)}</p>
                  </div>
                  <button type="button" className="btn-secondary" onClick={() => void deleteBudgetItem(item.id)}>Delete</button>
                </div>
              ))}
            </div>
          )}
        </Panel>
      )}

      {activeTab === 'gallery' && (
        <Panel title="Gallery" subtitle="Store gallery metadata entries (image URLs for now).">
          <form onSubmit={addGalleryItem} className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-4">
            <input className="field md:col-span-2" type="url" placeholder="Image URL" value={galleryDraft.imageUrl} onChange={(e) => setGalleryDraft((d) => ({ ...d, imageUrl: e.target.value }))} required />
            <input className="field" placeholder="Caption" value={galleryDraft.caption} onChange={(e) => setGalleryDraft((d) => ({ ...d, caption: e.target.value }))} />
            <div className="flex gap-2">
              <input className="field" placeholder="Category" value={galleryDraft.category} onChange={(e) => setGalleryDraft((d) => ({ ...d, category: e.target.value }))} />
              <button type="submit" className="btn-primary">Add</button>
            </div>
          </form>
          {gallery.length === 0 ? (
            <EmptyState text="No gallery items yet." />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {gallery.map((item) => (
                <div key={item.id} className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white/80">
                  <div className="aspect-[4/3] bg-stone-100">
                    <img src={item.imageUrl} alt={item.caption || 'Gallery item'} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-stone-900">{item.caption || 'Untitled image'}</p>
                    <p className="text-xs text-stone-500">{item.category || 'General'}</p>
                    <button type="button" className="btn-secondary mt-3 w-full" onClick={() => void deleteGalleryItem(item.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Panel>
      )}

      {activeTab === 'qna' && (
        <Panel title="FAQ" subtitle="Add common guest questions and answers.">
          <form onSubmit={addFaqItem} className="mb-4 grid grid-cols-1 gap-3">
            <input className="field" placeholder="Question" value={faqDraft.question} onChange={(e) => setFaqDraft((d) => ({ ...d, question: e.target.value }))} required />
            <textarea className="field min-h-[90px]" placeholder="Answer" value={faqDraft.answer} onChange={(e) => setFaqDraft((d) => ({ ...d, answer: e.target.value }))} required />
            <div className="flex gap-2">
              <input className="field" placeholder="Category" value={faqDraft.category} onChange={(e) => setFaqDraft((d) => ({ ...d, category: e.target.value }))} />
              <button type="submit" className="btn-primary">Add FAQ</button>
            </div>
          </form>
          {faq.length === 0 ? (
            <EmptyState text="No FAQ items yet." />
          ) : (
            <div className="space-y-3">
              {faq.map((item) => (
                <div key={item.id} className="rounded-xl border border-stone-200/80 bg-white/75 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-stone-900">{item.question}</p>
                      <p className="mt-1 text-sm leading-6 text-stone-600">{item.answer}</p>
                    </div>
                    <button type="button" className="btn-secondary" onClick={() => void deleteFaqItem(item.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Panel>
      )}

      {activeTab === 'shop' && (
        <Panel title="Registry" subtitle="Track registry links and quantities.">
          <form onSubmit={addRegistryItem} className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-4">
            <input className="field md:col-span-2" type="url" placeholder="Gift URL" value={registryDraft.giftUrl} onChange={(e) => setRegistryDraft((d) => ({ ...d, giftUrl: e.target.value }))} />
            <input className="field" type="number" min="1" placeholder="Qty needed" value={registryDraft.quantityNeeded} onChange={(e) => setRegistryDraft((d) => ({ ...d, quantityNeeded: e.target.value }))} />
            <button type="submit" className="btn-primary">Add Item</button>
            <textarea className="field md:col-span-4 min-h-[80px]" placeholder="Notes" value={registryDraft.notes} onChange={(e) => setRegistryDraft((d) => ({ ...d, notes: e.target.value }))} />
          </form>
          {registry.length === 0 ? (
            <EmptyState text="No registry items yet." />
          ) : (
            <div className="space-y-2">
              {registry.map((item) => (
                <div key={item.id} className="flex flex-col gap-2 rounded-xl border border-stone-200/80 bg-white/75 p-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <a href={item.giftUrl || '#'} target="_blank" rel="noreferrer" className="font-medium text-rose-700 hover:underline">
                      {item.giftUrl || 'Registry item'}
                    </a>
                    <p className="text-sm text-stone-600">Needed: {item.quantityNeeded || 1} | Received: {item.quantityReceived || 0}</p>
                    {item.notes && <p className="text-xs text-stone-500">{item.notes}</p>}
                  </div>
                  <button type="button" className="btn-secondary" onClick={() => void deleteRegistryItem(item.id)}>Delete</button>
                </div>
              ))}
            </div>
          )}
        </Panel>
      )}
    </div>
  );
};
