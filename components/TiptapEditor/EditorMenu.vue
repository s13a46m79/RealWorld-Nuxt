<template>
  <ToolbarRoot
      class="flex p-[10px] w-full max-w-[610px] !min-w-max rounded-md bg-white"
      aria-label="Formatting options"
    >
    <ToolbarToggleGroup v-model="toggleStateMultiple" type="multiple" aria-label="Text formatting">
      <ToolbarToggleItem
        class="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none hover:bg-[#5cb85c] hover:text-white focus:relative focus:shadow-[0_0_0_2px] focus:shadow-[#5cb85c] first:ml-0 data-[state=on]:bg-[#5cb85c] data-[state=on]:text-white"
        value="bold"
        aria-label="Bold"
        :disabled="!editor?.can().chain().focus().toggleBold().run()"
        @click="editor?.chain().focus().toggleBold().run()"
        :data-state="editor?.isActive('bold') ? 'on' : 'off'"
      >
        <Icon class="w-[15px] h-[15px]" name="radix-icons:font-bold" />
      </ToolbarToggleItem>
      <ToolbarToggleItem
        class="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none hover:bg-[#5cb85c] hover:text-white focus:relative focus:shadow-[0_0_0_2px] focus:shadow-[#5cb85c] first:ml-0 data-[state=on]:bg-[#5cb85c] data-[state=on]:text-white"
        value="italic"
        aria-label="Italic"
        :disabled="!editor?.can().chain().focus().toggleItalic().run()"
        @click="editor?.chain().focus().toggleItalic().run()"
        :data-state="editor?.isActive('italic') ? 'on' : 'off'"
      >
        <Icon class="w-[15px] h-[15px]" name="radix-icons:font-italic" />
      </ToolbarToggleItem>
      <ToolbarToggleItem
        class="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none hover:bg-[#5cb85c] hover:text-white focus:relative focus:shadow-[0_0_0_2px] focus:shadow-[#5cb85c] first:ml-0 data-[state=on]:bg-[#5cb85c] data-[state=on]:text-white"
        value="strikethrough"
        aria-label="Strike through"
        :disabled="!editor?.can().chain().focus().toggleStrike().run()"
        @click="editor?.chain().focus().toggleStrike().run()"
        :data-state="editor?.isActive('Strike') ? 'on' : 'off'"
      >
        <Icon class="w-[15px] h-[15px]" name="radix-icons:strikethrough" />
      </ToolbarToggleItem>
    </ToolbarToggleGroup>
    <ToolbarSeparator class="w-[1px] bg-mauve6 mx-[10px]" />
    <ToolbarToggleGroup v-model="toggleStateSingle" type="single" aria-label="Text Alignment">
      <ToolbarToggleItem
        class="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none hover:bg-[#5cb85c] hover:text-white focus:relative focus:shadow-[0_0_0_2px] focus:shadow-[#5cb85c] first:ml-0 data-[state=on]:bg-[#5cb85c] data-[state=on]:text-white"
        value="left"
        aria-label="Left Aligned"
      >
        <Icon class="w-[15px] h-[15px]" name="radix-icons:text-align-left" />
      </ToolbarToggleItem>
      <ToolbarToggleItem
        class="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none hover:bg-[#5cb85c] hover:text-white focus:relative focus:shadow-[0_0_0_2px] focus:shadow-[#5cb85c] first:ml-0 data-[state=on]:bg-[#5cb85c]data-[state=on]:text-white"
        value="center"
        aria-label="Center Aligned"
      >
        <Icon class="w-[15px] h-[15px]" name="radix-icons:text-align-center" />
      </ToolbarToggleItem>
      <ToolbarToggleItem
        class="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none hover:bg-[#5cb85c] hover:text-white focus:relative focus:shadow-[0_0_0_2px] focus:shadow-[#5cb85c] first:ml-0 data-[state=on]:bg-[#5cb85c] data-[state=on]:text-white"
        value="right"
        aria-label="Right Aligned"
      >
        <Icon class="w-[15px] h-[15px]" name="radix-icons:text-align-right" />
      </ToolbarToggleItem>
    </ToolbarToggleGroup>
  </ToolbarRoot>

</template>

<script setup lang="ts">
import {
  ToolbarButton,
  ToolbarLink,
  ToolbarRoot,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from 'radix-vue'
import { Editor } from '@tiptap/vue-3';

const toggleStateSingle = ref()
const toggleStateMultiple = ref([])

defineProps({
  editor: Editor,
})
</script>