<script>
import { Review } from "../model/review.entity.js";
import { ReviewService } from "../services/review.service.js";
import DataManager from "../../shared/components/data-manager.component.vue";
import ReviewItemCreateAndEditDialog from "../components/review-item-create-and-edit.component.vue";

export default {
  name: "review-management",
  components: { ReviewItemCreateAndEditDialog, DataManager },
  data() {
    return {
      title: { singular: "Review", plural: "Reviews" },
      reviews: [],
      review: new Review({}),
      selectedReviews: [],
      reviewService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false,
    }
  },
  methods: {
    notifySuccessfulAction(message) {
      this.$toast.add({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
    },
    findIndexById(id) {
      return this.reviews.findIndex(review => review.id === id);
    },
    onNewItem() {
      this.review = new Review({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },
    onEditItem(item) {
      this.review = new Review(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },
    onDeleteItem(item) {
      this.review = { ...item };
      this.deleteReview();
    },
    onDeleteSelectedItems(selectedItems) {
      this.selectedReviews = selectedItems;
      this.deleteSelectedReviews();
    },
    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },
    onSaveRequested(item) {
      this.submitted = true;
      if (this.review.rating && this.review.comment.trim()) {
        if (item.id) {
          this.updateReview();
        } else {
          this.createReview();
        }
        this.createAndEditDialogIsVisible = false;
        this.isEdit = false;
      }
    },
    createReview() {
      this.reviewService.create(this.review).then(response => {
        let review = new Review(response.data);
        this.reviews.push(review);
        this.notifySuccessfulAction("Review Created");
      }).catch(error => console.error(error));
    },
    updateReview() {
      this.reviewService.update(this.review.id, this.review).then(response => {
        let index = this.findIndexById(this.review.id);
        this.reviews[index] = new Review(response.data);
        this.notifySuccessfulAction("Review Updated");
      }).catch(error => console.error(error));
    },
    deleteReview() {
      this.reviewService.delete(this.review.id).then(() => {
        let index = this.findIndexById(this.review.id);
        this.reviews.splice(index, 1);
        this.notifySuccessfulAction("Review Deleted");
      }).catch(error => console.error(error));
    },
    deleteSelectedReviews() {
      this.selectedReviews.forEach((review) => {
        this.reviewService.delete(review.id).then(() => {
          this.reviews = this.reviews.filter((t) => t.id !== review.id);
        });
      });
      this.notifySuccessfulAction("Reviews Deleted");
    }
  },
  created() {
    this.invoiceService = new InvoiceService();
    this.invoiceService.getAll().then(response => {
      this.invoices = response.data.map(invoice => new Invoice(invoice));
    }).catch(error => console.error(error));
  }
}
</script>

<template>
  <div class="w-full">
    <h2 class="reviews-title">{{ $t('review.title') }}</h2>
    <!-- Tarjetas de reviews -->
    <div v-for="review in reviews" :key="review.id" class="review-card">
      <div class="review-header">
        <strong>{{ $t('review.user') }}: {{ review.userId }}</strong>
        <span class="stars">
          <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= Number(review.rating) }">&#9733;</span>
        </span>
      </div>
      <div class="review-comment">
        {{ $t('review.comment') }}: {{ review.comment }}
      </div>
    </div>

    <data-manager :title="title"
                  :items="reviews"
                  @new-item-requested="onNewItem"
                  @edit-item-requested="onEditItem($event)"
                  @delete-item-requested="onDeleteItem($event)"
                  @delete-selected-items-requested="onDeleteSelectedItems($event)">
      <template #custom-columns>
        <pv-column :sortable="true" field="id" :header="$t('review.id')" style="min-width: 12rem"/>
        <pv-column :sortable="true" field="userId" :header="$t('review.user')" style="min-width: 12rem"/>
        <pv-column :sortable="true" field="rating" :header="$t('review.rating')" style="min-width: 8rem"/>
        <pv-column :sortable="true" field="comment" :header="$t('review.comment')" style="min-width: 24rem"/>
      </template>
    </data-manager>
    <review-item-create-and-edit-dialog
        :edit="isEdit"
        :item="review"
        :visible="createAndEditDialogIsVisible"
        @cancel-requested="onCancelRequested"
        @save-requested="onSaveRequested($event)"/>
  </div>
</template>
<style scoped>
.review-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  background: #fafafa;
}
.stars {
  color: #ffd700;
  margin-left: 8px;
}
.star {
  font-size: 1.2em;
  color: #ddd;
}
.star.filled {
  color: #ffd700;
}
.review-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: #000;
}
.review-comment {
  color: #000;
}

.reviews-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #043873;
}
</style>