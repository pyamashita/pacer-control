import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import "../../styles/shake-animation.css";

interface CardItem {
  id: string;
  component: JSX.Element;
  className: string;
}

function SortableCard({ id, children, className, isEditMode }: {
  id: string;
  children: React.ReactNode;
  className: string;
  isEditMode: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(isEditMode ? listeners : {})}
      className={`${className} sortable-item ${isDragging ? 'is-dragging' : ''} ${isEditMode ? 'shake-animation ring-2 ring-blue-400 ring-offset-2 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : ''}`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [cards, setCards] = useState<CardItem[]>([
    {
      id: "metrics",
      component: <EcommerceMetrics />,
      className: "col-span-12 space-y-6 xl:col-span-7"
    },
    {
      id: "sales",
      component: <MonthlySalesChart />,
      className: "col-span-12 space-y-6 xl:col-span-7"
    },
    {
      id: "target",
      component: <MonthlyTarget />,
      className: "col-span-12 xl:col-span-5"
    },
    {
      id: "statistics",
      component: <StatisticsChart />,
      className: "col-span-12"
    },
    {
      id: "demographic",
      component: <DemographicCard />,
      className: "col-span-12 xl:col-span-5"
    },
    {
      id: "orders",
      component: <RecentOrders />,
      className: "col-span-12 xl:col-span-7"
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCards((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDragEnd = () => {
    // ドラッグ終了時の処理（LocalStorageへの保存など）
    if (isEditMode) {
      localStorage.setItem('dashboardLayout', JSON.stringify(cards.map(c => c.id)));
    }
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      // 保存処理をここに追加（LocalStorageやAPIなど）
      localStorage.setItem('dashboardLayout', JSON.stringify(cards.map(c => c.id)));
    }
  };

  return (
    <>
      <PageMeta
        title="Dashboard | PACER Control"
        description="This is Dashboard page for PACER Control."
      />
      
      <div className="relative mt-12">
        {/* 歯車/保存ボタン */}
        <button
          onClick={toggleEditMode}
          className="fixed top-24 right-10 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:scale-105 transition-all duration-200"
          title={isEditMode ? "保存" : "編集"}
        >
          {isEditMode ? (
            // 保存アイコン
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            // 歯車アイコン
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
        </button>

        {isEditMode ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={cards.map(card => card.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-12 gap-4 md:gap-6">
                {cards.map((card) => (
                  <SortableCard
                    key={card.id}
                    id={card.id}
                    className={card.className}
                    isEditMode={isEditMode}
                  >
                    {card.component}
                  </SortableCard>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        ) : (
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {cards.map((card) => (
              <div key={card.id} className={card.className}>
                {card.component}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}